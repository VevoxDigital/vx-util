
/**
 * A single langugage dictionary with stores the mapping of i18n keys to their
 * respective localized values
 */
export class LanguageDictionary extends Map<string, string> {

  /** The pattern used to parse language dictionaries */
  public static readonly DICTIONARY_PATTERN = /^([\w.-]+)\s+(.+)$/gm

  /**
   * Attempts to parse (and coerce if necessary) the given data into a
   * language dictionary
   * @param data The data to be parsed
   */
  public static parse (data: string): LanguageDictionary {
    const dict = new LanguageDictionary()

    let line: RegExpExecArray | null
    do {
      line = this.DICTIONARY_PATTERN.exec(data)
      if (line) dict.set(line[1], line[2])
    } while (line)

    return dict
  }

  public constructor (data: Dictionary<string> = {}) {
    const initial: Array<[ string, string ]> = []
    for (const k of Object.keys(data)) initial.push([k, (data as Dictionary)[k]])
    super(initial)
  }

  /**
   * Appends the contents of the given language dictionary, overwriting any
   * keys already present with the new values
   * @param from The dictionary to add
   */
  public concat (from: Map<string, string>): this {
    if (from instanceof Map) for (const [ key, val ] of from.entries()) this.set(key, val)
    return this
  }
}
