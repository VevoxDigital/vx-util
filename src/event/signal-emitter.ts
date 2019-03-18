import { Signal } from './signal'

// Committing this interface for now, but its unusable until TS 3.4
// See https://github.com/Microsoft/TypeScript/issues/11152
export interface ISignalEmitter<E extends IDictionary<Signal<any[]>>, K extends keyof E = keyof E> {

    on (name: K): E[K]

}
