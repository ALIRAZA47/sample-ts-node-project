import { it } from 'mocha'
import { noAuthTest } from '../sites/noAuth.test'
import supertest from 'supertest'
import app from '../../src/app'
import { expect } from 'chai'
import { OK } from '../../src/constants/statusCodes'
import { tokenProtocol } from './index.test'

export default () => {
    it('Get all Protocols (without Token)', (done) => {
        noAuthTest('get', '/api/v1/protocol/', done)
    })

    it('Get all Protocols (with valid Token)', (done) => {
        supertest(app)
            .get('/api/v1/protocol/')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${tokenProtocol}`)
            .end(function (err, { body, statusCode }) {
                expect(statusCode).to.equal(OK)
                expect(body.statusCode).to.equal(OK)
                expect(body.data).to.be.an('array')
                expect(body.data.length).to.be.greaterThan(0)

                done()
            })
    })
}
