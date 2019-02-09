
import { Ordered } from './ordered'

/**
 * An ordered pair of objects
 */
export class OrderedPair<A, B = A> extends Ordered<[A, B]> {

  /** The first object in the set */
  public readonly a: A
  /** The second object in the set */
  public readonly b: B

  /**
   * Creates a new pair with the given two objects
   * @param a The first object
   * @param b The second object
   */
  public constructor (a: A, b: B) {
    super(a, b)
    this.a = a
    this.b = b
  }

  public clone (): OrderedPair<A, B> {
    return new OrderedPair<A, B>(this.a, this.b)
  }
}
