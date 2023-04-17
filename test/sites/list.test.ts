import { BAD_REQUEST, OK } from '../../src/constants/statusCodes'
import { expect } from 'chai'
import supertest from 'supertest'
import app from '../../src/app'
import { siteProtocol1, tokenSite } from './index.test'
import { noAuthTest } from './noAuth.test'

export default () => {
    it('GET sites (without Token)', (done) => {
        noAuthTest('get', '/api/v1/sites', done)
    })

    it('Get sites (with valid Payload)', (done) => {
        supertest(app)
            .get('/api/v1/sites')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${tokenSite}`)
            .end(function (err, { body, statusCode }) {
                expect(statusCode).to.equal(OK)
                expect(body.statusCode).to.equal(OK)
                expect(body.data).to.be.an('object')
                expect(body.data.total_records).to.equal(1)
                expect(body.data.data).to.be.an('array')
                expect(body.data.data).to.shallowDeepEqual([
                    {
                        number: 6,
                        primary_investigator: {
                            name: 'ale',
                            email: 'ale@gmnil.com',
                            phone_number: '12415432523',
                        },
                        sponsor: {
                            name: 'ali',
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
                        site_permissions: [
                            {
                                entity_type: 'protocol',
                                entity_details: {
                                    protocol_id: String(siteProtocol1._id),
                                    protocol_name: siteProtocol1.name,
                                },
                                enrollment: 'high',
                            },
                        ],
                    },
                ])

                done()
            })
    })

    it('Get sites against Sponsor (with sponsor exist)', (done) => {
        supertest(app)
            .get('/api/v1/sites?sponsor=ali')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${tokenSite}`)
            .end(function (err, { body, statusCode }) {
                expect(statusCode).to.equal(OK)
                expect(body.statusCode).to.equal(OK)
                expect(body.data).to.be.an('object')
                expect(body.data.total_records).to.equal(1)
                expect(body.data.data).to.be.an('array')
                expect(body.data.data[0]).to.shallowDeepEqual({
                    number: 6,
                    primary_investigator: {
                        name: 'ale',
                        email: 'ale@gmnil.com',
                        phone_number: '12415432523',
                    },

                    sponsor: {
                        name: 'ali',
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

    it('Get sites against Sponsor (without sponsor exist)', (done) => {
        supertest(app)
            .get('/api/v1/sites?sponsor=ark')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${tokenSite}`)
            .end(function (err, { body, statusCode }) {
                expect(statusCode).to.equal(OK)
                expect(body.statusCode).to.equal(OK)
                expect(body.data).to.be.an('object')
                expect(body.data.total_records).to.equal(0)
                expect(body.data.data).to.be.an('array')

                done()
            })
    })

    it('GET sites by Protocol (without Token)', (done) => {
        noAuthTest(
            'get',
            '/api/v1/sites/protocolId/634d42c2a23987a0763508eb',
            done
        )
    })

    it('GET sites by Protocol (with invalid objectId)', (done) => {
        supertest(app)
            .get('/api/v1/sites/protocolId/abc-xyz')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${tokenSite}`)
            .end(function (err, { body, statusCode }) {
                expect(statusCode).to.equal(BAD_REQUEST)
                expect(body.statusCode).to.equal(BAD_REQUEST)
                done()
            })
    })

    it('GET sites by Protocol (with valid objectId)', (done) => {
        supertest(app)
            .get(`/api/v1/sites/protocolId/${siteProtocol1._id}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${tokenSite}`)
            .end(function (err, { body, statusCode }) {
                expect(statusCode).to.equal(OK)
                expect(body.statusCode).to.equal(OK)
                expect(body.data).to.be.an('object')
                expect(body.data.data[0]).to.shallowDeepEqual({
                    site_number: '6',
                    status: 'Inactive',
                    entity_type: 'protocol',
                    enrollment: 'high',
                    screening: 'Off',
                    randomization: 'Off',
                    auto_resupply: 'Off',
                    site: [
                        {
                            number: '6',
                            contact_info: {
                                email: 'raza@gmail.com',
                                phone_number: '12541314435',
                            },
                            primary_investigator: {
                                name: 'ale',
                                email: 'ale@gmnil.com',
                                phone_number: '12415432523',
                            },
                            sponsor: {
                                name: 'ali',
                            },
                            country: 'pk',
                            city: 'krc',
                            state: 'sndh',
                            zip_code: '12800',
                            timezone: 'GMT+5',
                            dts_observed: false,
                            location: 'lhr',
                            address: {
                                line_1: 'korangi rd',
                                line_2: 'karanchi',
                            },
                            drug_delivery_address: {
                                line_1: 'korangi rd',
                                line_2: 'karanchi',
                                line_3: 'ssefs',
                            },
                        },
                    ],
                })
                done()
            })
    })
}
