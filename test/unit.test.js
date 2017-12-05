'use strict'

const Fastify = require('fastify')
const {
  beforeEach,
  afterEach,
  test
} = require('tap')
const service = require('../')

let app
beforeEach((done) => {
  app = Fastify()
  app.register(service)
  app.ready(done)
})

afterEach((done) => {
  app.close(done)
})

test('GET /', function (t) {
  app.inject({
    method: 'GET',
    url: '/'
  }, function (response) {
    t.equal(response.statusCode, 200)
    t.deepEqual(JSON.parse(response.payload), { hello: 'world' })
    t.end()
  })
})
