import { Request, Response } from 'express'
import Logger from '../logger'
import { generateUUID } from '../generators/generateUUID'
import CustomException from './customException'
import { logSeverity, logTypes } from '../../constants/types'

const globalResponseHandler = (
    req: Request,
    res: Response,
    statusCode: number,
    message?: any,
    data: any = null
) => {
    const responseData = {
        statusCode: statusCode,
        message: message,
        data: data,
    }

    if (statusCode >= 400) {
        const err = new CustomException(statusCode, message)
        Logger.error(
            {
                log_id: generateUUID(),
                log_type: logTypes.REQ_RES,
                log_severity: logSeverity.ERROR,
                req,
                err,
            },
            'Error processing request'
        )
    } else {
        Logger.info(
            {
                log_id: generateUUID(),
                log_type: logTypes.REQ_RES,
                log_severity: logSeverity.INFO,
                req,
                res,
            },
            'Request processed successfully'
        )
    }
    res.status(statusCode).send(responseData)
}

export default globalResponseHandler
