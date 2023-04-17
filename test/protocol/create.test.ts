import { it } from 'mocha'
import { noAuthTest } from '../sites/noAuth.test'
import app from '../../src/app'
import supertest from 'supertest'
import { expect } from 'chai'
import { CREATED, EMPTY_BODY } from '../../src/constants/statusCodes'
import { tokenProtocol } from './index.test'

export default () => {
    it('Create Protocol (without Token)', (done) => {
        noAuthTest('post', '/api/v1/protocol/', done)
    })

    it('Create Protocol (without Payload)', (done) => {
        supertest(app)
            .post('/api/v1/protocol/')
            .set('Authorization', `Bearer ${tokenProtocol}`)
            .send({})
            .set('Accept', 'application/json')
            .end(function (err, { body, statusCode }) {
                expect(statusCode).to.equal(EMPTY_BODY)
                expect(body.statusCode).to.equal(EMPTY_BODY)
                done()
            })
    })

    it('Create Protocol (with correct Payload)', (done) => {
        supertest(app)
            .post('/api/v1/protocol/')
            .set('Authorization', `Bearer ${tokenProtocol}`)
            .send({
                unique_id: 'test-protocol1',
                name: 'test-protocol1',
                randomization: 1500,
            })
            .set('Accept', 'application/json')
            .end(function (err, { body, statusCode }) {
                expect(statusCode).to.equal(CREATED)
                expect(body.statusCode).to.equal(CREATED)
                expect(body.data).to.shallowDeepEqual({
                    unique_id: 'test-protocol1',
                    name: 'test-protocol1',
                    randomization: 1500,
                })
                done()
            })
    })
}
