import { ISealable } from '../util/sealable'

export type SlotDecay = number | Functional.Producer<number | boolean>
export type Slot<T extends any[]> = (data: Signal<T>, ...args: T) => boolean | void

export interface ISlot<T extends any[]> {
    /** The slot function */
    slot: Slot<T>

    /** A value deciding when a hook should decay */
    decay?: SlotDecay
}

export class Signal<T extends any[]>
implements ISealable {

    private readonly _slots: Array<ISlot<T>> = []

    private _sealed = false

    /**
     * Hooks a function handler to this event. A decay can be provided as a number of times until the handler
     * unhooks (or a function that returns such) or a function returning a boolean value (true will be unhooked)
     * @param slot The handler to hook
     * @param decay Optionally, how long before this handler unhooks
     */
    public connect (slot: Slot<T>, decay?: SlotDecay): this {
        if (this._sealed) throw new Error('Cannot attach additional slots to a sealed signal')

        this._slots.push({ slot, decay })
        return this
    }

    /**
     * A helper function to connect a slot with a decay of `1`.
     * @param handler The handler to hook
     * @see {@link #connect}
     */
    public connectOnce (slot: Slot<T>): this {
        return this.connect(slot, 1)
    }

    /**
     * A helper function to connect many slots to this signal
     * @param slots The slots
     * @see {@link #connect}
     */
    public connectMany (slots: Array<Pick<ISlot<T>, 'slot' | 'decay'>>): this {
        slots.forEach(slot => this.connect(slot.slot, slot.decay))
        return this
    }

    /**
     * Fires this event with the given data, returning whether or not this event completed all hooks
     * @param data The data to fire with
     */
    public fire (...data: T): boolean {
        for (let i = 0; i < this._slots.length; i++) {
            if (this._slots[i].slot(this, ...data)) return false
            this.decay(i)
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
        else {
            const val = hook.decay()
            return typeof val === 'number' ? val <= 0 : val
        }
    }
}
