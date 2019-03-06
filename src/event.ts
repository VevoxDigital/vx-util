
import MaxEventListenersReachedError from './error/max-event-listeners'

interface IEventListener {
  func: CallbackFunction
  once: boolean
}

export default class EventEmitterImpl<E extends IDictionary, K = keyof E> implements IEventEmitter<E, K> {
  public static readonly ANY_EVENT = Symbol('any-event')

  private handlers: Map<K | symbol, IDictionary<IEventListener>>
  private limits: Map<K | symbol, number>

  constructor () {
    this.handlers = new Map<K | symbol, IDictionary<IEventListener>>()
    this.limits = new Map<K | symbol, number>()
  }

  public on (event: K | symbol, listener: CallbackFunction, once: boolean = false): symbol {
    const unique = Symbol()
    const l = { func: listener, once }

    const dict = this.handlers.get(event)
    if (dict) {
      const limit = this.getMax(event) || 0
      // This whole "unsafe cast" thing is dumb, but it'll have to work for now.
      // See Microsoft/TypeScript#1863
      if (limit && Object.getOwnPropertySymbols(dict).length < limit) dict[unique as any as string] = l
      else throw new MaxEventListenersReachedError(limit)
    } else this.handlers.set(event, { [unique]: l })

    return unique
  }

  public onAny (listener: (event: K, ...args: any[]) => void): symbol {
    return this.on(EventEmitterImpl.ANY_EVENT, listener)
  }

  public once (event: K | symbol, listener: CallbackFunction): symbol {
    return this.on(event, listener, true)
  }

  public off (listener: symbol): this {
    for (const event of this.handlers.keys()) delete this.handlers.get(event)![listener as any as string]
    return this
  }

  public offAll (): this {
    this.handlers = new Map<K | symbol, IDictionary<IEventListener>>()
    return this
  }

  public emit (event: K | symbol, ...args: any[]): this {
    const listeners = this.handlers.get(event) || { }
    for (const id of Object.getOwnPropertySymbols(listeners)) {
      const l = listeners[id as any as string]
      if (!l) continue
      l.func(...args)
      if (l.once) delete listeners[id as any as string]
    }

    if (event !== EventEmitterImpl.ANY_EVENT) this.emit(EventEmitterImpl.ANY_EVENT, event, ...args)
    return this
  }

  public setMax (max: number, event: K | symbol = EventEmitterImpl.ANY_EVENT): void {
    this.limits.set(event, max)
  }

  public getMax (event?: K | symbol): number {
    return (event && this.limits.has(event))
      ? this.limits.get(event)!
      : (this.limits.get(EventEmitterImpl.ANY_EVENT) || 0)
  }

  public events (): ReadonlyArray<K | symbol> {
    return Array.from(this.handlers.keys())
  }
}
