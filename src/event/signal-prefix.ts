import { Signal } from './signal'

export class PrefixedSignal<T extends any[]> extends Signal<T> {

    /**
     * A secondary signal available to prefixed signals that should be fired *before* the
     * main signal would otherwise normally fire, and only fire if this signal passes
     */
    public readonly pre: Signal<T>

    public constructor (pre: Signal<T> = new Signal<T>()) {
      super()
      this.pre = pre
    }

    /**
     * Tries to call the pre-signal for this signal, and, if it passes, the callback is executed
     * and this signal is fired. Returns the result of the callback if the pre-signal passed. If
     * the pre-signal for this signal is another prefixed signal, a {@link #try} is used on that
     * signal as well.
     * @param callback The callback to call if the pre-signal passes
     * @param args Args for the signal
     */
    public try <R = void> (callback: Functional.Producer<R>, ...args: T): Optional<R> {
      return this.fire(...args) ? callback() : undefined
    }

    /**
     * Fires the prefixed signal first, then, only if all its callbacks passed, this signal is fired
     * and the result is returned
     * @param args Args to fire the signal with
     * @see Signal#fire
     */
    public fire (...args: T): boolean {
      return this.pre.fire(...args) && super.fire(...args)
    }

    /**
     * Helper method to {@link Sealable#seal} both this signal and its pre-signal
     */
    public sealBoth (): void {
      this.seal()
      this.pre.seal()
    }
}
