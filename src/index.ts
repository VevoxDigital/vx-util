
/// <reference path="../index.d.ts" />

import * as util from './util'

export { default as EventEmitter } from './event'

export * from './logger'

export * from './event/signal'
export * from './event/signal-cancellable'

export { default as ProcessMain } from './process'
export { default as ProcessMessage } from './process/message'
export { default as ProcessWrapper } from './process/wrapper'

export * from './math/vector/c2f'
export * from './math/vector/p2f'

export { util }
export * from './util/ordered/ordered'
export * from './util/ordered/pair'
export * from './util/ordered/triple'
export * from './util/cloneable'
export * from './util/comparable'
export * from './util/index'
export * from './util/map'
export * from './util/random'
export * from './util/sealable'
export * from './util/serializeable'

Math.PI_2 = Math.PI * 2
Math.PI_HALF = Math.PI / 2
Math.PI_QUARTER = Math.PI / 4

Math.ROTATION_FULL = 360
Math.ROTATION_HALF = 180
Math.ROTATION_QUARTER = 90
Math.ROTATION_EIGHTH = 45

Math.deg = (r: number): number => r * (Math.ROTATION_HALF / Math.PI)
Math.rad = (d: number): number => d * (Math.PI / Math.ROTATION_HALF)
