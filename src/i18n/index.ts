
import * as debug from 'debug'

import { LanguageDictionary } from './dictionary'

const d = debug('vx-util:i18n')

/**
 * The primary manager for Horizon's Internationalization.
 * @see {LanguageDictionary}
 * @author Matthew Struble <matt@vevox.io>
 */
export class I18nManager extends Map<string, LanguageDictionary> {
  /** The fallback language ID to use if the primary is unavailable. */
  public readonly fallbackLanguage: string

  /** The currently selected primary language ID. */
  public primaryLanguage?: string

  public constructor (fallbackLanguage: string) {
    super()
    this.fallbackLanguage = fallbackLanguage
    d('built new manager using fallback %s', fallbackLanguage)
  }

  /**
   * Registers a language dictionary to the manager under a specific language
   * ID. If a dictionary exists for this ID, the data in the given dictionary
   * is appended to the existing, overwriting any duplicate keys.
   * @see {LanguageDictionary}
   * @see {LanguageDictionary#add}
   * @param lang The language ID to add the dictionary under
   * @param from A dictionary to add i18n keys from
   */
  public add (lang: string, from: LanguageDictionary): void {
    const existing = this.get(lang)
    d('add %s (exists: %s)', lang, !!existing)
    this.set(lang, existing ? existing.add(from) : from)
  }

  /**
   * Gets the primary language dictionary if a primary language ID is defined
   * and a dictionary is registered to it. Otherwise, `undefined` is returned.
   * @see {LanguageDictionary}
   * @see {I18nManager#primaryLanguage}
   * @returns The language dictionary, if one is present
   */
  public getPrimaryDictionary (): LanguageDictionary | undefined {
    return this.primaryLanguage ? this.get(this.primaryLanguage) : undefined
  }

  /**
   * Gets the fallback language dictionary that is used if there is no primary
   * dictionary or the primary dictionary lacks a specific key
   * @see {LanguageDictionary}
   * @see {I18nManager#fallbackLanguage}
   * @returns The fallback language dictionary, if one is present
   */
  public getFallbackDictionary (): LanguageDictionary | undefined {
    return this.get(this.fallbackLanguage)
  }

  /**
   * Attempts to localize the key first by searching through the primary
   * language dictionary, then the fallback if the key was not found, then
   * finally just returning the key if not found in either dictionary.
   * @param key The key to look up
   * @returns The localized string
   */
  public localize (key: string): string {
    const primary = this.getPrimaryDictionary()

    if (primary && primary.has(key)) {
      d('localized %s', key)
      return primary.get(key)!
    } else {
      const fallback = this.getFallbackDictionary()

      if (fallback && fallback.has(key)) {
        d('localize %s (from fallback)', key)
        return fallback.get(key)!
      } else {
        d('entry for %s not found', key)
        return key
      }
    }
  }
}
