import { expect } from 'chai'
import {
    BAD_REQUEST,
    NO_CONTENT,
    NOT_FOUND,
} from '../../src/constants/statusCodes'
import supertest from 'supertest'
import { SitePermissionModel } from '../../src/models/sitePermission'
import app from '../../src/app'
import { tokenSite } from './index.test'
import { noAuthTest } from './noAuth.test'

export default () => {
    it('Delete Site Permission (without Token)', (done) => {
        noAuthTest('delete', '/api/v1/sites/permissions/123', done)
    })

    it('Delete Site Permission (without any ID)', (done) => {
        supertest(app)
            .delete('/api/v1/sites/permissions/')
            .set('Authorization', `Bearer ${tokenSite}`)
            .end(function (err, { body, statusCode }) {
                expect(statusCode).to.equal(NOT_FOUND)
                expect(body.statusCode).to.equal(NOT_FOUND)
                expect(body.message).to.equal(
                    'Cannot DELETE /api/v1/sites/permissions/'
                )
                done()
            })
    })

    it('Delete Site Permission (with wrong ID)', (done) => {
        supertest(app)
            .delete('/api/v1/sites/permissions/1336a70aff515616156c725f')
            .set('Authorization', `Bearer ${tokenSite}`)
            .end(function (err, { body, statusCode }) {
                expect(statusCode).to.equal(NOT_FOUND)
                expect(body.statusCode).to.equal(NOT_FOUND)
                expect(body.message).to.equal(
                    'Error: Site with Site Permission Id:1336a70aff515616156c725f does not exist'
                )
                done()
            })
    })

    it('Delete Site Permission (with invalid ID)', (done) => {
        supertest(app)
            .delete('/api/v1/sites/permissions/ads123')
            .set('Authorization', `Bearer ${tokenSite}`)
            .end(function (err, { body, statusCode }) {
                expect(statusCode).to.equal(BAD_REQUEST)
                expect(body.statusCode).to.equal(BAD_REQUEST)
                expect(body.message).to.equal('Provided Id is not valid')
                done()
            })
    })

    it('Delete Site Permission (with valid ID)', (done) => {
        SitePermissionModel.find({
            site_number: '6',
        }).then((data) => {
            supertest(app)
                .delete(`/api/v1/sites/permissions/${data[0].id}`)
                .set('Authorization', `Bearer ${tokenSite}`)
                .end(function (err, { statusCode }) {
                    expect(statusCode).to.equal(NO_CONTENT)
                    done()
                })
        })
    })
}
