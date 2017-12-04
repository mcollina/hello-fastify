'use strict'

const Fastify = require('fastify')
const {
  beforeEach,
  afterEach,
  test
} = require('tap')
const service = require('../')

let server
beforeEach((done) => {
  server = Fastify()
  server.register(service)
  server.ready(done)
})

afterEach((done) => {
  server.close(done)
})

test('GET /', function (t) {
  server.inject({
    method: 'GET',
    url: '/'
  }, function (response) {
    t.equal(response.statusCode, 200)
    t.deepEqual(JSON.parse(response.payload), { hello: 'world' })
    t.end()
  })
})
