export default class CustomObject extends Object {
    constructor(obj?: object) {
        super()
        Object.assign(this, obj)
    }

    [key: string]: any

    mergeObjects(target: object, source: object): object {
        const keys =
            Object.keys(source).length > Object.keys(target).length
                ? Object.keys(source)
                : Object.keys(target)
        for (const key of keys) {
            if (
                Object.keys(target).includes(key) &&
                Object.keys(source).includes(key)
            ) {
                if (
                    typeof target[key] === 'object' &&
                    typeof source[key] === 'object'
                ) {
                    target[key] = this.mergeObjects(target[key], source[key])
                } else {
                    target[key] = source[key]
                }
            } else {
                if (Object.keys(source).includes(key)) {
                    target[key] = source[key]
                } else {
                    target[key] = target[key]
                }
            }
        }
        return target
    }
}
