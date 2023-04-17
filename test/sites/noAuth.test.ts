import app from '../../src/app'
import { expect } from 'chai'
import { FORBIDDEN } from '../../src/constants/statusCodes'
import supertest from 'supertest'

export const noAuthTest = (method, url, done) => {
    supertest(app)
        [method](url)
        .set('Accept', 'application/json')
        .end(function (err, { body, statusCode }) {
            expect(statusCode).to.equal(FORBIDDEN)
            expect(body.statusCode).to.equal(FORBIDDEN)

            done()
        })
}
