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

test('GET /', async function (t) {
  const response = await app.inject({
    method: 'GET',
    url: '/'
  })

  t.equal(response.statusCode, 200)
  t.deepEqual(JSON.parse(response.payload), { hello: 'world' })
})
