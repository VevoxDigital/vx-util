
export interface IComparable<T> {
    /**
     * Compares this object to another, returning a corresponding number. A positive number
     * represents this object is "greater" by some means, zero is equal, and a negative represents
     * that this object is "lesser".
     * @param other The other object
     */
    compare (other: T): number

    /**
     * Determines if this object is equal to another in some fashion. The implementation here
     * should not necessary compare direct equality (don't use `==`) but rather that the
     * value of {@link #compare} is zero. The implementation can (and probably should) be
     * simply `this.compare(other) === 0`.
     * @param other
     */
    equals (other: T): boolean
}
