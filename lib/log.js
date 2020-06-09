'use strict'

const pino = require('pino')
const LOG_PRETTY = !!process.env.LOGPRETTY
const LOG_LEVEL = process.env.LOGLEVEL || 'info'
const PRETTY_OPTS = {
  colorize: true
, translateTime: true
, errorProps: 'code, meta'
, errorLikeObjectKeys: 'er,err,error'
}

module.exports = pino({
  name: 'accounts-service'
, level: LOG_LEVEL
, messageKey: 'message'
, prettyPrint: LOG_PRETTY ? PRETTY_OPTS : false
, formatters: {
    level: (label) => {
      return {level: label}
    }
  , bindings: (values) => {
      return {name: values.name}
    }
  }
}, pino.destination(2))

