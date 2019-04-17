
import * as winston from 'winston'

declare module 'winston' {

  interface Logger {
    readonly prefix?: string[]
    readonly children: Dictionary<Logger>
    readonly parent: Logger

    fork: (prefix: string, ...additionalPrefixes: string[]) => Logger
  }
}
