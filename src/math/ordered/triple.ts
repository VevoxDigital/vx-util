import { Ordered } from './ordered'

/**
 * An ordered set of three objects
 */
export class OrderedTriple<A, B = A, C = B> extends Ordered<[A, B, C]> {

  /** The first object in the set */
  public readonly a: A
  /** The second object in the set */
  public readonly b: B
  /** The third object in the set */
  public readonly c: C

  /**
   * Creates a new triple with the given three objects
   * @param a The first object
   * @param b The second object
   * @param c The third object
   */
  public constructor (a: A, b: B, c: C) {
    super(a, b, c)
    this.a = a
    this.b = b
    this.c = c
  }

  public clone (): OrderedTriple<A, B, C> {
    return new OrderedTriple<A, B, C>(this.a, this.b, this.c)
  }
}
