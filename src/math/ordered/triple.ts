import * as debug from 'debug'

import { ICloneable } from 'util/cloneable'
import ISerializeable from 'util/serializeable'

const d = debug('vx-util:ordered:triple')

/**
 * An ordered set of three objects
 */
export default class OrderedTriple<A, B = A, C = B>
implements ICloneable<OrderedTriple<A, B, C>>, ISerializeable<A | B | C> {

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
    this.a = a
    this.b = b
    this.c = c
  }

  public serialize (): IDictionary<A | B | C> {
    return {
      a: this.a,
      b: this.b,
      c: this.c
    }
  }

  public clone (): OrderedTriple<A, B, C> {
    d('clone %s', this.toString())
    return new OrderedTriple<A, B, C>(this.a, this.b, this.c)
  }

  public toString (): string {
    return `(${this.a},${this.b},${this.c})`
  }
}
