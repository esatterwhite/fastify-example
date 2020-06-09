'use strict'

const fluent = require('fluent-schema')
module.exports = {
  path: '/'
, method: 'POST'
, attachValidation: true
, schema: {
    body: fluent.object().prop('test', fluent.string().required())
  }
, handler: async (req, res) => {
    return {foo: 1}
  }
}
