
/**
 * A tuple key is one that combines to keys together
 */
export class TupleKey {
  /** The separator character */
  public static readonly SEP = '\u00A7'

  /**
   * Generates a new tuple key from the given raw string
   * @param raw The string to generate from
   * @returns The new key
   */
  public static fromString (raw: string): TupleKey {
    const i = raw.indexOf(TupleKey.SEP)
    if (i < 0) return new TupleKey(raw, 'r')
    else return new TupleKey(raw.substring(0, i), raw.substring(i + 1))
  }

  /** Most-significant key */
  public readonly l: string

  /** Least-significant key */
  public readonly r: string

  public constructor (l: string, r: string) {
    this.l = l
    this.r = r
  }

  public toString (): string {
    return this.l + TupleKey.SEP + this.r
  }

  public valueOf (): string {
    return this.toString()
  }
}
