
/**
 * An object that is normally mutable, but can be sealed to make it immutable
 */
export interface ISealable {

    /**
     * Whether or not this object is sealed
     */
    sealed: boolean

    /**
     * Seals this object, preventing further modification
     */
    seal (): void
}
