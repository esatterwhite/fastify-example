
'use strict'

const path = require('path')
const fastify = require('fastify')
const AutoLoad = require('fastify-autoload')
const log = require('./lib/log.js')

const server = fastify({logger: log})

server.register(AutoLoad, {
  dir: path.join(__dirname, 'plugins')
})

server.register(AutoLoad, {
  dir: path.join(__dirname, 'routes', 'v1')
, options: {prefix: 'v1/'}
})

module.exports = server

if (require.main === module) {
  process.once('SIGTERM', onSignal)
  process.once('SIGINT', onSignal)

  startup()
    .catch(/* istanbul ignore next */(err) => {
      server.log.error(err, 'server failed to start')
      process.nextTick(() => {
        throw err
      })
    })
}



async function startup() {
  await server.ready()
  await server.listen(3000)
  server.log.debug(server.printRoutes())
}

async function onSignal(signal) {
  server.log.info(`system signal received ${signal}`)
  try {
    await server.close()
  } catch (err) {
    /* istanbul ignore next */
    server.log.error(err, {err})
  }
}

