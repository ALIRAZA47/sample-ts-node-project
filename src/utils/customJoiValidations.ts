import { is24DigitHex } from './stringMethods'

export const validateObjectId = (value, helpers) => {
    if (!is24DigitHex(value)) {
        return helpers.error('any.custom')
    }
    return value
}
