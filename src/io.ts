
import { constants, promises as fs } from 'fs'

/**
 * Determines if a given path exists, and, optionally, if it is of the given type.
 * @param pathname The path name to the file
 * @param type The type to check for
 * @returns Whether or not the file exists (and is of the given type, if provided)
 */
export async function pathExists (pathname: string, type?: number): Promise<boolean> {
  try {
    const stats = await fs.stat(pathname)
    return typeof type === 'number' ? (stats.mode & constants.S_IFMT) === type : true
  } catch (err) {
    if (err.message.match(/^ENOENT/)) return false
    else throw err
  }
}
