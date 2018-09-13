import { OrderedPair } from '../math/ordered/pair'
import { ICloneable } from './cloneable'
import { ISerializeable } from './serializeable'

/**
 * A tuple key is one that combines to keys together
 */
export class TupleKey
extends OrderedPair<string>
implements ISerializeable<string>, ICloneable<TupleKey> {
  /** The separator character */
  public static readonly SEP = '\u00A7'

  /**
   * Generates a new tuple key from the given raw string
   * @param raw The string to generate from
   * @returns The new key
   */
  public static from (raw: string): TupleKey {
    const i = raw.indexOf(TupleKey.SEP)
    if (i < 0) return new TupleKey(raw, '')
    else return new TupleKey(raw.substring(0, i), raw.substring(i + 1))
  }

  public constructor (l: string, r: string) {
    super (l, r)
  }

  /** The left-hand side of the key */
  public get l (): string {
    return this.a
  }

  /** The right-hand side of the key */
  public get r (): string {
    return this.b
  }

  public toString (): string {
    return this.r.length ? this.l + ':' + this.r : this.l
  }

  public valueOf (): string {
    return this.l + TupleKey.SEP + this.r
  }

  public serialize (): IDictionary<string> {
    return {
      l: this.l,
      r: this.r
    }
  }

  public clone (): TupleKey {
    return new TupleKey(this.l, this.r)
  }
}
