import { expect } from 'chai'
import { CONFLICT, CREATED, EMPTY_BODY } from '../../src/constants/statusCodes'
import supertest from 'supertest'
import app from '../../src/app'
import { siteProtocol1, tokenSite } from './index.test'
import { noAuthTest } from './noAuth.test'

export default () => {
    it('Create Site (without Token)', (done) => {
        noAuthTest('post', '/api/v1/sites', done)
    })

    it('Create Site (without Payload)', (done) => {
        supertest(app)
            .post('/api/v1/sites')
            .set('Authorization', `Bearer ${tokenSite}`)
            .send({})
            .set('Accept', 'application/json')
            .end(function (err, { body, statusCode }) {
                expect(statusCode).to.equal(EMPTY_BODY)
                expect(body.statusCode).to.equal(EMPTY_BODY)
                done()
            })
    })

    it('Create Site (with existing Site Number)', (done) => {
        supertest(app)
            .post('/api/v1/sites')
            .set('Authorization', `Bearer ${tokenSite}`)
            .send({
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
                        enrollment: 'High',
                    },
                ],
            })
            .set('Accept', 'application/json')
            .end(function (err, { body, statusCode }) {
                expect(statusCode).to.equal(CONFLICT)
                expect(body.statusCode).to.equal(CONFLICT)
                expect(body.message).to.equal(
                    'Error: Site with Site#:6 already exists'
                )

                done()
            })
    })

    it('Create Site (with correct Payload)', (done) => {
        supertest(app)
            .post('/api/v1/sites')
            .set('Authorization', `Bearer ${tokenSite}`)
            .send({
                number: 7,
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
                        enrollment: 'High',
                    },
                ],
            })
            .set('Accept', 'application/json')
            .end(function (err, { body, statusCode }) {
                expect(statusCode).to.equal(CREATED)
                expect(body.statusCode).to.equal(CREATED)
                expect(body.data).to.be.an('object')
                expect(body.data).to.shallowDeepEqual({
                    number: 7,
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
                            enrollment: 'High',
                        },
                    ],
                })
                done()
            })
    })
}
