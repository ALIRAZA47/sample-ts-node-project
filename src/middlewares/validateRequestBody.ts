import CustomException from '../utils/global/customException'
import { isEmpty } from '../utils/objectMethods'
import joiValidateOptions from '../constants/validations/joi'
import { EMPTY_BODY, VALIDATION_ERROR } from '../constants/statusCodes'

const validateRequestBody = (schema) => {
    return (req, res, next) => {
        if (isEmpty(req.body)) {
            throw new CustomException(
                EMPTY_BODY,
                `Cannot ${req.method} empty body`
            )
        } else {
            const { error } = schema.validate(req.body, joiValidateOptions)
            const valid = error == null

            if (valid) {
                next()
            } else {
                const { details } = error
                // push all the errors into an array
                const message = []
                details.forEach((err) => {
                    message.push({
                        errMessage: err.message,
                        errDetails: {
                            key: err.context.key,
                            label: err.context.label,
                            path: err.path,
                        },
                    })
                })
                throw new CustomException(VALIDATION_ERROR, message)
            }
        }
    }
}
export default validateRequestBody
