
/// <reference path="../index.d.ts" />

import * as util from './util'
export { util }

export * from './event/signal-emitter'
export * from './event/signal-exception'
export * from './event/signal'

export * from './exception/ex-file-system'
export * from './exception/ex-illegal-access'
export * from './exception/ex-not-implemented'
export * from './exception/ex-out-of-bounds'
export * from './exception/ex-sealed-access'
export * from './exception/ex-unsupported-operation'
export * from './exception/exception'

export * from './i18n/dictionary'
export * from './i18n/index'

export * from './util/index'
export * from './util/interfaces'
export * from './util/map'
export * from './util/ordered'
export * from './util/random'

Math.PI_2 = Math.PI * 2
Math.PI_HALF = Math.PI / 2
Math.PI_QUARTER = Math.PI / 4

Math.ROTATION_FULL = 360
Math.ROTATION_HALF = 180
Math.ROTATION_QUARTER = 90
Math.ROTATION_EIGHTH = 45

Math.deg = (r: number): number => r * (Math.ROTATION_HALF / Math.PI)
Math.rad = (d: number): number => d * (Math.PI / Math.ROTATION_HALF)
