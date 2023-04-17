import {
    BAD_REQUEST,
    CONFLICT,
    CREATED,
    EMPTY_BODY,
    OK,
} from '../../src/constants/statusCodes'
import supertest from 'supertest'
import app from '../../src/app'
import { expect } from 'chai'
import { noAuthTest } from '../sites/noAuth.test'
import { DEPOT, DEPOT_BASE_URL, tokenDepot } from './index.test'

export default () => {
    it('Create Depot (without Token)', (done) => {
        noAuthTest('post', DEPOT_BASE_URL, done)
    })

    it('Create Depot (without Payload)', (done) => {
        supertest(app)
            .post(DEPOT_BASE_URL)
            .set('Authorization', `Bearer ${tokenDepot}`)
            .send({})
            .set('Accept', 'application/json')
            .end(function (err, { body, statusCode }) {
                expect(statusCode).to.equal(EMPTY_BODY)
                expect(body.statusCode).to.equal(EMPTY_BODY)
                done()
            })
    })

    it('Create Depot (with existing Depot Number)', (done) => {
        supertest(app)
            .post(DEPOT_BASE_URL)
            .set('Authorization', `Bearer ${tokenDepot}`)
            .send(DEPOT)
            .set('Accept', 'application/json')
            .end(function (err, { body, statusCode }) {
                expect(statusCode).to.equal(BAD_REQUEST)
                expect(body.statusCode).to.equal(BAD_REQUEST)
                expect(body.message).to.equal(
                    'Depot with Given Depot Number Already Exists'
                )

                done()
            })
    })

    it('Create Depot (with New Depot Number)', (done) => {
        supertest(app)
            .post(DEPOT_BASE_URL)
            .set('Authorization', `Bearer ${tokenDepot}`)
            .send({ ...DEPOT, depot_number: '12' })
            .set('Accept', 'application/json')
            .end(function (err, { body, statusCode }) {
                expect(statusCode).to.equal(OK)
                expect(body.statusCode).to.equal(OK)

                done()
            })
    })
}
