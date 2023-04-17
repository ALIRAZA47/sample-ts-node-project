import { isValidObjectId } from 'mongoose'
import CustomException from './global/customException'
import { BAD_REQUEST } from '../constants/statusCodes'

export const is24DigitHex = (hexCode) => {
    let re = /^([0-9a-f]{24}){1,2}$/i
    return re.test(hexCode)
}

export const validateObjectId = (objectId) => {
    if (!isValidObjectId(objectId)) {
        throw new CustomException(BAD_REQUEST, 'Provided ObjectId is not valid')
    }
}
