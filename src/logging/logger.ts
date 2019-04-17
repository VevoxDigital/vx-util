
/// <reference path="../augments.d.ts"/>

import * as debug from 'debug'
import { format, TransformableInfo } from 'logform'
import * as winston from 'winston'
import * as Transport from 'winston-transport'
import { name } from '../../package.json'

class DebuggerTransport extends Transport {

  public log (info: TransformableInfo, callback: () => void) {
    if (info[Symbol.for('level') as any] === 'debug') {
      debug(
        [ name.substring(1).replace('/', ':') ].concat(info.prefix as string[] || []).join(':')
      )(info.message)
    }
    callback()
  }

}

const logger = winston.createLogger({
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.splat(),
    format.printf(({ timestamp, level, message, prefix }) => {
      prefix = prefix ? `[${prefix.join(':')}] ` : ''
      return `${timestamp} ${level}: ${prefix}${message}`
    })
  ),
  level: 'debug',
  transports: [
    new winston.transports.Console({ level: 'verbose' }),
    new DebuggerTransport()
  ]
})

type MutableLogger = Mutable<winston.Logger, keyof winston.Logger>

// tslint:disable-next-line no-var-requires
import Logger = require('winston/lib/winston/logger')
Logger.prototype.fork = function (this: MutableLogger, p0: string, ...pX: string[]): winston.Logger {
  const prefix = (this.prefix || []).concat([p0])
  this.children = this.children || { }

  this.children[p0] = this.children[p0] || this.child({ prefix })
  const child = this.children[p0]!;
  (child as MutableLogger).prefix = prefix

  return pX.length ? child.fork(pX[0], ...pX.slice(1)) : child
}

export const LOG = logger