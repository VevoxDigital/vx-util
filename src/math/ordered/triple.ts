import { ICloneable } from 'util/cloneable'
import ISerializeable from 'util/serializeable'
import OrderedPair from './pair'

/**
 * An ordered set of three objects
 */
export default class OrderedTriple<A, B = A, C = B>
extends OrderedPair<A, B>
implements ICloneable<OrderedTriple<A, B, C>>, ISerializeable<A | B | C> {

  /** The third object in the set */
  public readonly c: C

  /**
   * Creates a new triple with the given three objects
   * @param a The first object
   * @param b The second object
   * @param c The third object
   */
  public constructor (a: A, b: B, c: C) {
    super(a, b)
    this.c = c
  }

  public serialize (): IDictionary<A | B | C> {
    return {
      ...super.serialize(),
      c: this.c
    }
  }

  public clone (): OrderedTriple<A, B, C> {
    return new OrderedTriple<A, B, C>(this.a, this.b, this.c)
  }
}
