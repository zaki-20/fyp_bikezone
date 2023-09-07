class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message); // Here, "message" refers to the user-provided error message.
        this.statusCode = statusCode
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ErrorHandler