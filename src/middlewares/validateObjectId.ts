import { isValidObjectId } from 'mongoose'
import { NextFunction, Request, Response } from 'express'
import CustomException from '../utils/global/customException'
import { BAD_REQUEST } from '../constants/statusCodes'

function validateObjectId(
    req: Request,
    res: Response,
    next: NextFunction
): void {
    if (
        !isValidObjectId(
            req.params.id ||
                req.params.permission_id ||
                req.params.permissionId ||
                req.params.user_id ||
                req.params.userId ||
                req.params.protocol_id ||
                req.params.protocolId
        )
    ) {
        throw new CustomException(BAD_REQUEST, 'Provided Id is not valid')
    }
    next()
}

export default validateObjectId
