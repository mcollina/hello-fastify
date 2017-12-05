'use strict'

const Fastify = require('fastify')
const request = require('request')
const {
  beforeEach,
  afterEach,
  test
} = require('tap')
const service = require('../')

let app
let address
beforeEach((done) => {
  app = Fastify()
  app.register(service)
  app.listen(0, (err) => {
    if (err) {
      return done(err)
    }

    address = `http://localhost:${app.server.address().port}/`
    done()
  })
})

afterEach((done) => {
  app.close(done)
})

test('GET /', function (t) {
  t.plan(3)

  request.get(address, function (err, res, body) {
    t.error(err)
    t.equal(res.statusCode, 200)
    t.deepEqual(JSON.parse(body), { hello: 'world' })
  })
})
