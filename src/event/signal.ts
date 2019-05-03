
import { SealedAccessException } from '../exception/ex-sealed-access'
import { ISealable } from '../util/interfaces'
import { SignalSlotException } from './signal-exception'

export type SlotDecay = number | Functional.Predicate<[]>

export type Slot<T extends any[]> = FunctionalAsync.Operator<T, any>
export type SlotSync<T extends any[]> = Functional.Operator<T, any>

export type Slotted<N extends string, A extends any[] = []> = {
  [key in N]: (...args: A) => Awaitable<boolean>
}

export interface IConnectedSlot<T extends any[]> {
  slot: Functional.Operator<T, Awaitable<boolean>>
  decay?: SlotDecay
  sync: boolean
}

/**
 * An implementation of the Signals & Slots concept available in other languages, taking on
 * an async approach while still having very event-like feel.
 */
export class Signal<T extends any[] = any[]>
implements ISealable, Iterable<Promise<T>> {

  // TODO implement listener limit and "rawListeners" concept

  /** A pre-fire signal for this signal. If this signal fails to fire, this one will not fire */
  public pre?: Signal<T>

  /** A post-fire signal for this signal. Fired automatically if this one successfully fires */
  public post?: Signal<T>

  private readonly _slots: Array<IConnectedSlot<T>> = []
  private _sealed = false

  public constructor (opts: Partial<{ pre: Signal<T>, post: Signal<T> }> = {}) {
    this.pre = opts.pre
    this.post = opts.post
  }

  public *[Symbol.iterator] () {
    while (true) yield this.promise()
  }

  /**
   * Hooks an asnyc function handler to this event. A decay can be provided as a number of times
   * until the handler should unhook or a function returning truthy when the handler has "decayed".
   * @param slot The handler to hook
   * @param decay Decay timer
   * @param thisArg Binding of `this` in the slot
   * @see #connectSync
   */
  public connect (slot: Slot<T>, decay?: SlotDecay, thisArg: any = this): this {
    SealedAccessException.check(this)
    this._slots.push({ slot: slot.bind(thisArg), decay, sync: false })
    return this
  }

  /**
   * Attached this signal to a given slotted object
   * @param slot The name of the slot to attach
   * @param at The slotted object itself
   * @param decay Decay for the attachment
   */
  public connectTo <N extends string> (slot: N, at: Slotted<N, T>, decay?: SlotDecay): this {
    SealedAccessException.check(this)
    this._slots.push({ slot: at[slot].bind(at as any), decay, sync: false })
    return this
  }

  /**
   * Hooks a sync function handler to this event. A decay can be provided as a number of times
   * until the handler should unhook or a function returning truthy when the handler has "decayed".
   * @param slot The handler to hook
   * @param decay Decay timer
   * @param thisArg Binding of `this` in the slot
   * @see #connect
   */
  public connectSync (slot: SlotSync<T>, decay?: SlotDecay, thisArg: any = this): this {
    SealedAccessException.check(this)
    this._slots.push({ slot: slot.bind(thisArg), decay, sync: true })
    return this
  }

  /**
   * A helper function to connect a slot with a decay of `1`.
   * @param handler The handler to hook
   * @param thisArg Binding of `this` in the slot
   * @see {@link #connect}
   */
  public connectOnce (slot: Slot<T>, thisArg?: any): this {
    return this.connect(slot, 1, thisArg)
  }

  /**
   * A helper function to connect a sync slot with a decay of `1`.
   * @param handler The handler to hook
   * @param thisArg Binding of `this` in the slot
   * @see {@link #connectSync}
   */
  public connectOnceSync (slot: SlotSync<T>, thisArg?: any): this {
    return this.connectSync(slot, 1, thisArg)
  }

  /**
   * Returns a promise that will resolve next time this event fires
   */
  public promise (): Promise<T> {
    return new Promise<T>(resolve => this.connectSync((...args: T) => resolve(args)))
  }

  /**
   * Fires this event with the given data, returning whether or not this event completed all
   * hooks. All connections, including those that are sync, are executed
   * @param data The data to fire with
   * @see #fireSync
   */
  public async fire (...data: T): Promise<any> {
    if (this.pre) {
      const p = await this.pre.fire(...data)
      if (p) return p
    }

    for (const [ slot, index ] of this._decay()) {
      try {
        const res = await slot.slot(...data)
        if (res) return res
      } catch (err) {
        throw new SignalSlotException(index).causedBy(err)
      }
    }

    if (this.post) {
      const p = await this.post.fire(...data)
      if (p) return p
    }
  }

  /**
   * Fires this event with the given data, returning whether or not this event completed all
   * hooks. Only sync connections are executed
   * @param data The data to fire with
   * @see #fire
   */
  public fireSync (...data: T): any {
    if (this.pre) {
      const p = this.pre.fireSync(...data)
      if (p) return p
    }

    for (const [ slot, index ] of this._decay(true)) {
      try {
        const res = slot.slot(...data)
        if (res) return res
      } catch (err) {
        throw new SignalSlotException(index).causedBy(err)
      }
    }

    if (this.post) {
      const p = this.post.fireSync(...data)
      if (p) return p
    }
  }

  /**
   * Disconnects all instances of a slot from this signal
   * @param slot The slot to disconnect
   */
  public disconnect (slot: Slot<T> | SlotSync<T>): void {
    SealedAccessException.check(this)
    for (let i = 0; i < this._slots.length; i++) {
      if (this._slots[i].slot === slot) this._slots.slice(i, 1)
    }
  }

  /**
   * Disconnects all slots from this signal
   */
  public disconnectAll (): void {
    SealedAccessException.check(this)
    for (const slot of this._slots) this.disconnect(slot.slot)
  }

  /**
   * Gets an array of slots registered to this signal
   * @param syncOnly Whether or not to only return sync slots
   */
  public slots (syncOnly: true): Array<SlotSync<T>>
  public slots (syncOnly?: false): Array<Slot<T> | SlotSync<T>>
  public slots (syncOnly?: boolean): Array<Slot<T> | SlotSync<T>> {
    const s = []
    for (const slot of this._slots) {
      if (syncOnly && !slot.sync) continue
      s.push(slot.slot)
    }
    return s
  }

  public get sealed () {
    return this._sealed
  }

  public seal () {
    this._sealed = true
  }

  /**
   * Seals the entire signal chain, calling this method on any pre- and post-fire signals attached
   * to this one
   */
  public sealAll () {
    this.seal()
    if (this.pre) this.pre.sealAll()
    if (this.post) this.post.sealAll()
  }

  private *_decay (syncOnly: boolean = false): IterableIterator<[IConnectedSlot<T>, number]> {
    for (let i = 0; i < this._slots.length; i++) {
      const slot = this._slots[i]
      if (syncOnly && !slot.sync) continue

      yield [ slot, i ]
      if (this._updateDecay(i)) this._slots.slice(i, 1)
    }
  }

  private _updateDecay (index: number): boolean {
    const hook = this._slots[index]
    if (!hook.decay) return false
    else if (typeof hook.decay === 'number') return --hook.decay <= 0
    else return hook.decay()
  }
}
