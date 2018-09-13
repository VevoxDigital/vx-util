import * as debug from 'debug'

import { ICloneable } from '../../util/cloneable'
import { ISerializeable } from '../../util/serializeable'

const d = debug('vx-util:ordered:pair')

/**
 * An ordered pair of objects
 */
export class OrderedPair<A, B = A>
implements ICloneable<OrderedPair<A, B>>, ISerializeable<A | B> {

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
    this.a = a
    this.b = b
  }

  public serialize (): IDictionary<A | B> {
    return {
      a: this.a,
      b: this.b
    }
  }

  public clone (): OrderedPair<A, B> {
    d('clone %s', this.toString())
    return new OrderedPair<A, B>(this.a, this.b)
  }

  public toString (): string {
    return `(${this.a},${this.b})`
  }
}
