import { IComparable } from './comparable'
import { ISealable } from './sealable'
import { OrderedPair } from './ordered/pair'
import { OrderedTriple } from './ordered/triple';

export interface IComparableMapOptions {
    /** Allows this map to be cleared */
    allowClear: boolean,

    /** Allows values to be deleted from this map, including "updates" to existing keys */
    allowDelete: boolean,

    /** Allows the putting of empty values to keys */
    allowEmpty: boolean
}

/**
 * An implementation of the ES {@link Map} that uses the {@link IComparable} interface to compare objects rather than
 * using the ES equality operator.
 */
export class ComparableMap<K extends IComparable<K>, V>
implements Map<K, V>, ISealable {

    public readonly [Symbol.toStringTag] = ComparableMap.name

    private isRegisterSealed: boolean = false
    private readonly pairs: Array<OrderedPair<K, V>> = [ ]

    public constructor (...values: Array<[K, V]>) {
        this.add(values)
    }

    public get sealed (): boolean {
        return this.isRegisterSealed
    }

    public get size (): number {
        return this.pairs.length
    }

    public *[Symbol.iterator](): IterableIterator<[K, V]> {
        for (const pair of this.pairs) yield [pair.a, pair.b]
    }

    public add (pairs: Array<[K, V]>) {
        for (const [k, v] of pairs) this.set(k, v)
    }

    public clear (): void {
        this.pairs.length = 0
    }

    public delete (key: K): boolean {
        const index = this.getIndex(key)
        if (index) this.pairs.splice(index.a, 1)
        return !!index
    }

    public entries (): IterableIterator<[K, V]> {
        return this[Symbol.iterator]()
    }

    public forEach (func: Functional.Consumer<[V, K, this]>): void {
        for (const [k, v] of this) func(v, k, this)
    }

    public get (key: K): Optional<V> {
        const index = this.getIndex(key)
        return index && index.c
    }

    public *keys (): IterableIterator<K> {
        for (const [k,] of this) yield k
    }

    public set (key: K, val: V): this {
        const existing = this.getIndex(key)
        const pair = new OrderedPair<K, V>(key, val)

        if (existing) this.pairs[existing.a] = pair
        else this.pairs.push(pair)

        return this
    }

    public *values (): IterableIterator<V> {
        for (const [,v] of this) yield v
    }

    public has (key: K): boolean {
        return !!this.getIndex(key)
    }

    public seal (): void {
        this.isRegisterSealed = true
    }

    private getIndex (key: K): Optional<OrderedTriple<number, K, V>> {
        for (let i = 0; i < this.size; i++) {
            if (this.pairs[i].a.equals(key)) return new OrderedTriple<number, K, V>(i, this.pairs[i].a, this.pairs[i].b)
        }
    }
}
