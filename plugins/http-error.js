'use strict'

const {STATUS_CODES} = require('http')
const plugin = require('fastify-plugin')

const EINTERNAL = 'EINTERNAL'

module.exports = plugin(httpError, {
  name: 'fastify-http-error'
, fastify: '>=2.0.0'
})

function httpError(fastify, opts, next) {
  fastify.setErrorHandler((err, req, res) => {
    console.log('plugin', req.validationError, err.validationError)
    const log = req.log
    const {statusCode = 500} = err
    const fn = statusCode >= 500
      ? log.error.bind(log)
      : log.warn.bind(log)

    fn(err)
    res
      .code(statusCode)
      .type('application/json')
      .send({
        message: STATUS_CODES[statusCode]
      , code: err.code || EINTERNAL
      , status: statusCode
      })

  })
  fastify.log.debug('[plugin]: http-error loaded')
  next()
}
