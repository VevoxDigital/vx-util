import { ICloneable } from '../cloneable'

/**
 * A generic ordered value of a specific tuple type
 */
export class Ordered<T extends any[]>
implements ICloneable<Ordered<T>> {

    [index: number]: T[number]

    private readonly values: T

    public constructor (...values: T) {
        this.values = values
        for (let i = 0; i < values.length; i++) this[i] = values[i]
    }

    /**
     * Gets the value at the given index, if any
     * @param i The index
     */
    public get <N extends number> (i: N): T[N] {
        return this[i]
    }

    public clone (): Ordered<T> {
        return new Ordered<T>(...this.values)
    }

    public toString (): string {
        return `(${this.values.join(',')})`
    }
}
