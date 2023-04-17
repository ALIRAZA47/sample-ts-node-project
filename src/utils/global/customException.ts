class CustomException extends Error {
    statusCode = null

    constructor(status: number, message: any) {
        super(message)
        Error.captureStackTrace(this, this.constructor)

        this.name = this.constructor.name
        this.message = message
        this.statusCode = status
    }
}

export default CustomException
