import { ICloneable } from 'util/cloneable'
import ISerializeable from 'util/serializeable'
import OrderedPair from './pair'

/**
 * An ordered set of three objects
 */
export default class OrderedTriple<T>
extends OrderedPair<T>
implements ICloneable<OrderedTriple<T>>, ISerializeable<T> {

  /** The third object in the set */
  public readonly c: T

  /**
   * Creates a new triple with the given three objects
   * @param a The first object
   * @param b The second object
   * @param c The third object
   */
  public constructor (a: T, b: T, c: T) {
    super(a, b)
    this.c = c
  }

  public serialize (): IDictionary<T> {
    return {
      ...super.serialize(),
      c: this.c
    }
  }

  public clone (): OrderedTriple<T> {
    return new OrderedTriple<T>(this.a, this.b, this.c)
  }
}
