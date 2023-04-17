// @ts-ignore
import 'mocha'
import home from './home/index.test'
import sites from './sites/index.test'
import depots from './depot/index.test'
import chai from 'chai'
import app from '../src/app'
import protocol from './protocol/index.test'

chai.use(require('chai-shallow-deep-equal'))

const port = 9090
let server

before((done) => {
    app.on('ready', function () {
        server = app.listen(port, async () => {
            console.log(`Listening: http://localhost:${port}`)
            done()
        })
    })
})

describe('Korio Test Cases', () => {
    describe('Home', home)
    describe('Sites', sites)
    describe('Depots', depots)
    describe('Protocols', protocol)
})

after((done) => {
    server.close(done)
})
