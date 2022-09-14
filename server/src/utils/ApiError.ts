export interface ApiError {
    status: number
    message: string
    critical: boolean
    stack?: string
}

export class ApiError extends Error {
    constructor(statusCode: number, message: string, critical = true, stack: string = '') {
        super(message);

        Object.setPrototypeOf(this, ApiError.prototype);

        this.status = statusCode;
        this.critical = critical;

        if( stack ) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}
