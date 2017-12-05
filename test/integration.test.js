'use strict'

const Fastify = require('fastify')
const fetch = require('node-fetch')
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

test('GET /', async function (t) {
  const res = await fetch(address)
  t.equal(res.status, 200)
  t.deepEqual(await res.json(), { hello: 'world' })
})
