import { it } from 'mocha'
import supertest from 'supertest'
import { expect } from 'chai'
import { NOT_FOUND, OK } from '../../src/constants/statusCodes'
import app from '../../src/app'
import { tokenSite } from './index.test'
import { noAuthTest } from './noAuth.test'

export default () => {
    it('Get single Site (without Token)', (done) => {
        noAuthTest('get', '/api/v1/sites/siteNumber/1324', done)
    })

    it('Get single Site (with invalid Site Number)', (done) => {
        supertest(app)
            .get('/api/v1/sites/siteNumber/1324')
            .set('Authorization', `Bearer ${tokenSite}`)
            .set('Accept', 'application/json')
            .end(function (err, { body, statusCode }) {
                expect(statusCode).to.equal(NOT_FOUND)
                expect(body.statusCode).to.equal(NOT_FOUND)
                done()
            })
    })

    it('Get single Site (with valid Site Number)', (done) => {
        supertest(app)
            .get('/api/v1/sites/siteNumber/7')
            .set('Authorization', `Bearer ${tokenSite}`)
            .set('Accept', 'application/json')
            .end(function (err, { body, statusCode }) {
                expect(statusCode).to.equal(OK)
                expect(body.statusCode).to.equal(OK)
                expect(body.data).to.be.an('object')
                expect(body.data).to.shallowDeepEqual({
                    number: 7,
                    primary_investigator: {
                        name: 'ale',
                        email: 'ale@gmnil.com',
                        phone_number: '12415432523',
                    },
                    country: 'pk',
                    city: 'krc',
                    state: 'sndh',
                    zip_code: '12800',
                    location: 'lhr',
                    dts_observed: false,
                    timezone: 'GMT+5',
                    contact_info: {
                        email: 'raza@gmail.com',
                        phone_number: '12541314435',
                        fax_number: '',
                    },
                    address: {
                        line_1: 'korangi rd',
                        line_2: 'karanchi',
                    },
                    drug_delivery_address: {
                        line_1: 'korangi rd',
                        line_2: 'karanchi',
                        line_3: 'ssefs',
                    },
                })
                done()
            })
    })
}
