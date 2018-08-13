
import * as debug from 'debug'

const d = debug('vx-util:i18n:dictionary')

/** The pattern used to parse language dictionaries */
export const DICTIONARY_PATTERN = /^([\w._]+) (.+)$/gm

/**
 * A single langugage dictionary with stores the mapping of i18n keys to their
 * respective localized values
 * @author Matthew Struble <matt@vevox.io>
 */
export class LanguageDictionary extends Map<string, string> {
  /**
   * Attempts to parse (and coerce if necessary) the given data into a
   * language dictionary
   * @param data The data to be parsed
   * @returns The parsed dictionary
   */
  public static parse (data: string): LanguageDictionary {
    const dict = new LanguageDictionary()
    d('start parsing')

    let line: RegExpExecArray | null
    do {
      line = DICTIONARY_PATTERN.exec(data)
      if (line) dict.set(line[1], line[2])
    } while (line)

    d('generated, %d keys', dict.size)
    return dict
  }

  /**
   * Appends the contents of the given language dictionary, overwriting any
   * keys already present with the new values
   * @param from The dictionary to add
   * @returns This dictionary, with the keys added
   */
  public add (from: LanguageDictionary): this {
    for (const [ key, val ] of from.entries()) this.set(key, val)
    return this
  }

  public set (key: string, val: string): this {
    d('set %s: %s', key, val)
    return super.set(key, val)
  }

  public get (key: string): string | undefined {
    const v = super.get(key)
    if (v) d('get %s: %s', key, v)
    else d('get %s, not found')
    return v
  }
}
