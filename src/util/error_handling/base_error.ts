import { StatusCodes } from 'http-status-codes'

class BaseError extends Error {
    public readonly name!: string;
    public readonly status!: StatusCodes;
    public readonly isOperational!: boolean;

    constructor(name: string, status: StatusCodes, isOperational: boolean, description: string) {
        super(description);
        Object.setPrototypeOf(this, new.target.prototype);

        this.name = name;
        this.status = status;
        this.isOperational = isOperational;

        Error.captureStackTrace(this);
    }
}

export default BaseError;