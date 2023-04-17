import { expect } from 'chai'
import supertest from 'supertest'
import app from '../../src/app'
import { OK } from '../../src/constants/statusCodes'

export default () => {
    it('Index', (done) => {
        supertest(app)
            .get('/api/v1')
            .set('Accept', 'application/json')
            .end(function (err, { body, statusCode }) {
                expect(statusCode).to.equal(OK)
                expect(body.statusCode).to.equal(OK)
                expect(body).to.be.an('object')
                expect(body).to.deep.equal({
                    statusCode: OK,
                    message: 'Korio',
                    data: 'Welcome from KORIO-API!',
                })
                done()
            })
    })
}
