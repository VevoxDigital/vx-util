import { ISealable } from '../util/sealable'
import { SignalSlotException } from './signal-exception'

export type SlotDecay = number | Functional.Producer<boolean>
export type Slot<T extends any[]> = (data: Signal<T>, ...args: T) => Awaitable<boolean | void>

export interface ISlot<T extends any[]> {
  /** The slot function */
  slot: Slot<T>

  /** A value deciding when a hook should decay */
  decay?: SlotDecay

  /** Whether or not to treat this slot as async */
  async: boolean
}

export type ConnectionOptions<T extends any[]> = Partial<ExcludeFields<ISlot<T>, 'slot'> & { thisArg: any }>

export class Signal<T extends any[] = []>
implements ISealable, Iterable<ISlot<T>> {

    private readonly _slots: Array<ISlot<T>> = []

    private _sealed = false

    /** A callback function that fires this signal */
    public get callback (): Functional.Consumer<T> {
        return (...args: T) => this.fire(...args)
    }

    /**
     * Hooks a function handler to this event. A decay can be provided as a number of times until
     * the handler or a function returning a boolean value (true will be unhooked)
     * Note that, if a slot returns a promise and is not marked as async, it will cause the signal
     * to fail to fire successfully.
     * @param slot The handler to hook
     * @param opts Options for the connection
     */
    public connect (slot: Slot<T>, opts: ConnectionOptions<T> = {}): this {
        if (this._sealed) throw new Error('Cannot attach additional slots to a sealed signal')

        slot = slot.bind(opts.thisArg || this)
        this._slots.push({ slot, decay: opts.decay, async: !!opts.async })
        return this
    }

    /**
     * Returns an async iterator that yields every time this signal is fired
     */
    public async *connectAsync (): AsyncIterableIterator<T> {
      while (true) yield this.connectOnceAsync()
    }

    /**
     * Returns a promise that is resolved the next time this signal is fired
     */
    public connectOnceAsync (): Promise<T> {
      return new Promise<T>(resolve => this.connectOnce((_signal, ...args: T) => resolve(args)))
    }

    /**
     * A helper function to connect a slot with a decay of `1`.
     * @param handler The handler to hook
     * @see {@link #connect}
     */
    public connectOnce (slot: Slot<T>, thisArg?: any): this {
      return this.connect(slot, { decay: 1, thisArg })
    }

    /**
     * A helper function to connect many slots to this signal
     * @param slots The slots
     * @see {@link #connect}
     */
    public connectMany (slots: Array<Slot<T>>, opts: ConnectionOptions<T>): this {
      slots.forEach(slot => this.connect(slot, opts))
      return this
    }

    /**
     * Fires this event with the given data, returning whether or not this event completed all
     * hooks. Only sync connections are executed
     * @param data The data to fire with
     * @see #fireAsync
     */
    public fire (...data: T): boolean {
      for (let i = 0; i < this._slots.length; i++) {
        try {
          const slot = this._slots[i]
          if (slot.async) continue
          this.decay(i)
          const res = slot.slot(this, ...data)
          if (res instanceof Promise) throw new SignalSlotException(i).causedBy('Async hook called syncronously')
          if (res) return false
        } catch (err) { throw new SignalSlotException(i).causedBy(err) }
      }
      return true
    }

    /**
     * Fires this event with the given data, returning whether or not this event completed all
     * hooks. All connections, including those async, are executed
     * @param data The data to fire with
     * @see #fire
     */
    public async fireAsync (...data: T): Promise<boolean> {
      for (let i = 0; i < this._slots.length; i++) {
        try {
          if (await this._slots[i].slot(this, ...data)) return false
          this.decay(i)
        } catch (err) { throw new SignalSlotException(i).causedBy(err) }
      }
      return true
    }

    /**
     * Disconnects a signal by UUID
     * @param uid
     */
    public disconnect (slot: Slot<T>): boolean {
      const [ slotData, index ] = this.getAt(slot)
      if (!slotData) return false

      slotData.decay = 0
      this.decay(index)
      return true
    }

    public [Symbol.iterator] (): IterableIterator<ISlot<T>> {
        return this._slots[Symbol.iterator]()
    }

    public get sealed (): boolean {
        return this._sealed
    }

    public seal (): void {
        this._sealed = true
    }

    private getAt (slot: Slot<T>): [ Optional<ISlot<T>>, number ] {
        for (let i = 0; i < this._slots.length; i++) {
            const slotData = this._slots[i]
            if (slotData.slot === slot) return [ slotData, i ]
        }
        return [ undefined, -1 ]
    }

    private decay (index: number): void {
        if (this.updateDecay(index)) this._slots.slice(index, 1)
    }

    private updateDecay (index: number): boolean {
        const hook = this._slots[index]
        if (hook.decay === undefined) return false
        else if (typeof hook.decay === 'number') return --hook.decay <= 0
        else return hook.decay()
    }
}
