import { noAuthTest } from '../sites/noAuth.test'
import supertest from 'supertest'
import app from '../../src/app'
import { expect } from 'chai'
import { DEPOT_BASE_URL, tokenDepot } from './index.test'
import { OK } from '../../src/constants/statusCodes'

export default () => {
    it('GET Depot (without Token)', (done) => {
        noAuthTest('get', DEPOT_BASE_URL, done)
    })
    it('Get depots (with valid Payload)', (done) => {
        supertest(app)
            .get(DEPOT_BASE_URL)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${tokenDepot}`)
            .end(function (err, { body, statusCode }) {
                expect(statusCode).to.equal(OK)
                expect(body.statusCode).to.equal(OK)
                expect(body.data).to.be.an('object')
                expect(body.data.total_records).to.equal(1)
                expect(body.data.data).to.be.an('array')
            })
        done()
    })
}
