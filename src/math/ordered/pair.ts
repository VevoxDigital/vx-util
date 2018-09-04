import { ICloneable } from 'util/cloneable'
import ISerializeable from 'util/serializeable'

/**
 * An ordered pair of objects
 */
export default class OrderedPair<T>
implements ICloneable<OrderedPair<T>>, ISerializeable<T> {

  /** The first object in the set */
  public readonly a: T
  /** The second object in the set */
  public readonly b: T

  /**
   * Creates a new pair with the given two objects
   * @param a The first object
   * @param b The second object
   */
  public constructor (a: T, b: T) {
    this.a = a
    this.b = b
  }

  public serialize (): IDictionary<T> {
    return {
      a: this.a,
      b: this.b
    }
  }

  public clone (): OrderedPair<T> {
    return new OrderedPair<T>(this.a, this.b)
  }
}
