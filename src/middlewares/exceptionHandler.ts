import globalResponseHandler from '../utils/global/responseHandler'
import { OK } from '../constants/statusCodes'

export function notFound(req, res) {
    res.status(404)
    throw Error(`Cannot ${req.method} ${req.url}`)
}

/* eslint-disable no-unused-vars */
export function errorHandler(err, req, res, next) {
    if (process.env.NODE_ENV !== 'test') {
        // eslint-disable-next-line no-console
        console.error(`Exception handled with error message: '${err.message}'`)
    }
    let statusCode = err.statusCode
        ? err.statusCode
        : res.statusCode !== OK
        ? res.statusCode
        : 500
    globalResponseHandler(
        req,
        res,
        statusCode,
        statusCode === 500 ? 'Something went wrong!' : err.message
    )
}
