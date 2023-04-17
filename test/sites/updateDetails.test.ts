import { expect } from 'chai'
import { EMPTY_BODY, NO_CONTENT } from '../../src/constants/statusCodes'
import supertest from 'supertest'
import app from '../../src/app'
import { tokenSite } from './index.test'
import { noAuthTest } from './noAuth.test'

export default () => {
    it('Update Site Details (without Token)', (done) => {
        noAuthTest('patch', '/api/v1/sites/6/details', done)
    })

    it('Update Site Details (without payload)', (done) => {
        supertest(app)
            .patch('/api/v1/sites/7/details')
            .set('Authorization', `Bearer ${tokenSite}`)
            .send({})
            .set('Accept', 'application/json')
            .end(function (err, { body, statusCode }) {
                expect(statusCode).to.equal(EMPTY_BODY)
                expect(body.statusCode).to.equal(EMPTY_BODY)
                done()
            })
    })

    it('Update Site Details (with payload)', (done) => {
        supertest(app)
            .patch('/api/v1/sites/7/details')
            .set('Authorization', `Bearer ${tokenSite}`)
            .send({
                primary_investigator: {
                    name: 'ale',
                },
            })
            .set('Accept', 'application/json')
            .end(function (err, { statusCode }) {
                expect(statusCode).to.equal(NO_CONTENT)
                done()
            })
    })
}
