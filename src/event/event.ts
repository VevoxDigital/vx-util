import { ISealable } from 'util/sealable'

export type EventHookDecay = number | Functional.Producer<number | boolean>
export type EventHookHandler<E extends Event, T> = Functional.Function<[T, E], void | boolean>

export interface IEventHook<E extends Event, T> {
    /** The hook handler */
    handler: EventHookHandler<E, T>

    /** A value deciding when a hook should decay */
    decay?: EventHookDecay
}

export class Event<T = any>
implements ISealable {

    private readonly _hooks: IEventHook<this, T>[] = []

    private _sealed = false

    /**
     * Hooks a function handler to this event. A decay can be provided as a number of times until the handler
     * unhooks (or a function that returns such) or a function returning a boolean value (true will be unhooked)
     * @param handler The handler to hook
     * @param decay Optionally, how long before this handler unhooks
     */
    public hook (handler: EventHookHandler<this, T>, decay?: EventHookDecay): this {
        if (this._sealed) throw new Error('Cannot attach additional hooks to a sealed event')
        this._hooks.push({ handler, decay })
        return this
    }

    /**
     * Hooks a function handler to this event, with a decay of `1`.
     * @param handler The handler to hook
     * @see {@link hook}
     */
    public hookOnce (handler: EventHookHandler<this, T>): this {
        return this.hook(handler, 1)
    }

    /**
     * Fires this event with the given data, returning whether or not this event completed all hooks
     * @param data The data to fire with
     */
    public fire (data: T): boolean {
        for (let i = 0; i < this._hooks.length; i++) {
            if (this._hooks[i].handler(data, this)) return false
            this.decay(i)
        }
        return true
    }

    public [Symbol.iterator] (): IterableIterator<IEventHook<this, T>> {
        return this._hooks[Symbol.iterator]()
    }

    public get sealed (): boolean {
        return this._sealed
    }

    public seal (): void {
        this._sealed = true
    }

    private decay (index: number): void {
        if (this.updateDecay(index)) this._hooks.slice(index, 1)
    }

    private updateDecay (index: number): boolean {
        const hook = this._hooks[index]
        if (hook.decay === undefined) return false
        else if (typeof hook.decay === 'number') return --hook.decay <= 0
        else {
            const val = hook.decay()
            return typeof val === 'number' ? val <= 0 : val
        }
    }
}
