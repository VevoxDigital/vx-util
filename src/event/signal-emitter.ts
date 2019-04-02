
import { Signal } from './signal'

export type SignalDictionary<T extends Dictionary<Signal<any[]>>> = { [K in keyof T]: T[K] }
  & IDictionary<Signal<any[]>>

/** The type of a signal's args */
export type SignalArgs<T> = T extends Signal<infer U> ? U : T

/** Signal emitter listener */
export type Listener<T extends Signal<any[]> | any[] = any[]> = Functional.Consumer<SignalArgs<T>>

// Committing this interface for now, but its unusable until TS 3.4
// See https://github.com/Microsoft/TypeScript/issues/11152
export interface ISignalEmitter<T extends Dictionary<Signal<any[]>>> extends NodeJS.EventEmitter {

  signal (name: symbol): Signal<any[]>
  signal <K extends keyof T> (name: K): T[K]

  addListener (event: symbol, listener: Listener): this
  addListener <K extends keyof T> (event: K, listener: Listener<T[K]>): this

  on (event: symbol, listener: Listener): this
  on <K extends keyof T> (event: K, listener: Listener<T[K]>): this

  once (event: symbol, listener: Listener): this
  once <K extends keyof T> (event: K, listener: Listener<T[K]>): this

  listeners (event: symbol): Listener[]
  listeners <K extends keyof T> (event: K): Array<Listener<T[K]>>

  emit (event: symbol, ...args: any[]): boolean
  emit <K extends keyof T> (event: K, ...args: SignalArgs<T[K]>): boolean

  prependListener (event: symbol, listener: Listener): this
  prependListener <K extends keyof T> (event: K, listener: Listener<T[K]>): this

  prependOnceListener (event: symbol, listener: Listener): this
  prependOnceListener <K extends keyof T> (event: K, listener: Listener<T[K]>): this
}

/* export function createSignalEmitter <T extends Dictionary<Signal<any[]>>> (data: T): SignalDictionary<T> {

}

export abstract class SignalEmitter<T extends Dictionary<Signal<any[]>>> implements ISignalEmitter<T>,
SignalDictionary {

  private _getSignal <K extends keyof T> (name: K): T[K]
  private _getSignal (name: symbol | string): Signal<any[]>
  private _getSignal (name: symbol | string): Signal<any[]> {
    const signals = this as any as IDictionary<Signal<any[]>>
    let signal = signals[name.toString()] // find some better way to handle symbols, me thinks
    if (!signal) {
      signal = new Signal<any[]>()
      signals[name.toString()] = signal
    }
    return signal
  }

} */
