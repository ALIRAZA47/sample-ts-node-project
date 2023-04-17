import chai, { expect } from 'chai'
import { CREATED, VALIDATION_ERROR } from '../../src/constants/statusCodes'
import supertest from 'supertest'
import app from '../../src/app'
import { siteProtocol2, tokenSite } from './index.test'
import { noAuthTest } from './noAuth.test'

chai.use(require('chai-shallow-deep-equal'))
export default () => {
    it('Update Site Permission (without token)', (done) => {
        noAuthTest('put', '/api/v1/sites/6/permissions', done)
    })

    it('Update Site Permission (without payload)', (done) => {
        supertest(app)
            .put('/api/v1/sites/7/permissions')
            .set('Authorization', `Bearer ${tokenSite}`)
            .send({
                site_permissions: [{}],
            })
            .set('Accept', 'application/json')
            .end(function (err, { body, statusCode }) {
                expect(statusCode).to.equal(VALIDATION_ERROR)
                expect(body.statusCode).to.equal(VALIDATION_ERROR)
                expect(body.message[0].errMessage).to.equal(
                    'Site permissions is required and cannot be null'
                )
                done()
            })
    })

    it('Update Site Permission (with payload)', (done) => {
        supertest(app)
            .put('/api/v1/sites/7/permissions')
            .set('Authorization', `Bearer ${tokenSite}`)
            .send({
                site_permissions: [
                    {
                        entity_type: 'protocol',
                        entity_details: {
                            protocol_id: siteProtocol2._id,
                            protocol_name: siteProtocol2.name,
                        },
                        enrollment: 'Low',
                    },
                ],
            })
            .set('Accept', 'application/json')
            .end(function (err, { body, statusCode }) {
                expect(statusCode).to.equal(CREATED)
                expect(body.statusCode).to.equal(CREATED)
                expect(body.data.length).to.equal(1)
                expect(body.data[0]).to.shallowDeepEqual({
                    site_number: '7',
                    status: 'Inactive',
                    entity_type: 'protocol',
                    entity_details: {
                        protocol_id: String(siteProtocol2._id),
                        protocol_name: siteProtocol2.name,
                    },
                    enrollment: 'Low',
                    screening: 'Off',
                    randomization: 'Off',
                    auto_resupply: 'Off',
                })
                done()
            })
    })
}
