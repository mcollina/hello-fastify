'use strict'

const Fastify = require('fastify')
const request = require('request')
const {
  beforeEach,
  afterEach,
  test
} = require('tap')
const service = require('../')

let server
let address
beforeEach((done) => {
  server = Fastify()
  server.register(service)
  server.listen(0, (err) => {
    if (err) {
      return done(err)
    }

    address = `http://localhost:${server.server.address().port}/`
    done()
  })
})

afterEach((done) => {
  server.close(done)
})

test('GET /', function (t) {
  t.plan(3)

  request.get(address, function (err, res, body) {
    t.error(err)
    t.equal(res.statusCode, 200)
    t.deepEqual(JSON.parse(body), { hello: 'world' })
  })
})
