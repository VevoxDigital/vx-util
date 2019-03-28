import { LanguageDictionary } from './dictionary'

/**
 * Internationalization manager
 * @see {LanguageDictionary}
 */
export class I18nManager extends Map<string, LanguageDictionary> {

  /** A parse pattern for parsing language dictionaries */
  public static readonly DICTIONARY_PARSE_PATTERN = /^([\w.-]+)\s+(.+)$/gm

  /**
   * Parse the given string into a map of strings, treating it as a language dictionary
   * @param data The data to parse
   */
  public static parse (data: string): Map<string, string> {
    const dict = new Map<string, string>()

    let line: RegExpExecArray | null
    do {
      line = this.DICTIONARY_PARSE_PATTERN.exec(data)
      if (line) dict.set(line[1], line[2])
    } while (line)

    return dict
  }

  /** The fallback language ID to use if the primary is unavailable. */
  public readonly fallbackLanguage: string

  /** The currently selected primary language ID. */
  public primaryLanguage?: string

  public constructor (fallbackLanguage: string) {
    super()
    this.fallbackLanguage = fallbackLanguage
  }

  /**
   * Gets the primary language dictionary if a primary language ID is defined and a dictionary
   * is registered to it. Otherwise, `undefined` is returned.
   * @see {I18nManager#primaryLanguage}
   */
  public get primary (): Optional<LanguageDictionary> {
    return this.primaryLanguage ? this.get(this.primaryLanguage) : undefined
  }

  /**
   * Gets the fallback language dictionary that is used if there is no primary dictionary or the
   * primary dictionary lacks a specific key
   * @see {I18nManager#fallbackLanguage}
   */
  public get fallback (): Optional<LanguageDictionary> {
    return this.get(this.fallbackLanguage)
  }

  /**
   * Registers a language dictionary to the manager under a specific language ID. If a dictionary
   * exists for this ID, the data in the given dictionary is appended to the existing, overwriting
   * any duplicate keys.
   * @param lang The language ID to add the dictionary under
   * @param from A dictionary to add i18n keys from
   */
  public add (lang: string, from: LanguageDictionary): void {
    const existing = this.get(lang)
    if (existing) existing.concat(from)
    else this.set(lang, from)
  }

  /**
   * Attempts to localize the key first by searching through the primary language dictionary, then
   * the fallback if the key was not found, then finally just returning the key if not found in
   * either dictionary.
   * @param key The key to look up
   */
  public localize (key: string): string {
    const { primary, fallback } = this // tslint:disable-line no-this-assignment
    return (primary && primary.get(key))
      || (fallback && fallback.get(key))
      || key
  }
}
