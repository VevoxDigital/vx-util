import { Signal } from './signal'

export class CancellableSignal<T extends any[]> extends Signal<T> {
    /**
     * A secondary signal available to cancellable signals that should be fired *before* the
     * main signal would otherwise normally fire, and only fire if this signal passes
     */
    public readonly pre = new Signal<T>()

    /**
     * Tries to call the pre-signal for this signal, and, if it passes, the callback is executed
     * and this signal is fired. Returns the result of the callback if the pre-signal passed.
     * @param callback The callback to call if the pre-signal passes
     * @param args Args for the signal
     */
    public try <R = void> (callback: Functional.Producer<R>, ...args: T): Optional<R> {
        if (this.pre.fire(...args)) {
            const res = callback()
            this.fire(...args)
            return res
        }
    }
}
