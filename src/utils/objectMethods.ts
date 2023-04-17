export const isEmpty = (obj) => {
    return Object.keys(obj).length === 0
}
export const convertEachStringInObjectToLowerCase = (
    obj,
    excludedKeys = []
) => {
    for (const key of Object.keys(obj)) {
        if (excludedKeys.includes(key) === false) {
            if (typeof obj[key] === 'string') {
                obj[key] = obj[key].toLowerCase()
            } else if (typeof obj[key] === 'object') {
                obj[key] = convertEachStringInObjectToLowerCase(
                    obj[key],
                    excludedKeys
                )
            } else if (Array.isArray(obj[key])) {
                obj[key] = obj[key].map((item) => {
                    return convertEachStringInObjectToLowerCase(
                        item,
                        excludedKeys
                    )
                })
            }
        }
    }
    return obj
}
export const trimEachStringInObject = (obj) => {
    for (const key of Object.keys(obj)) {
        if (typeof obj[key] === 'string') {
            obj[key] = obj[key].trim()
        } else if (typeof obj[key] === 'object') {
            obj[key] = trimEachStringInObject(obj[key])
        } else if (Array.isArray(obj[key])) {
            obj[key] = obj[key].map((item) => {
                return trimEachStringInObject(item)
            })
        }
    }
    return obj
}
