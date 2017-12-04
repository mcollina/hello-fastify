'use strict'

module.exports = function (fastify, options, next) {
  fastify.get('/', (request, reply) => {
    reply.send({ hello: 'world' })
  })

  next()
}
