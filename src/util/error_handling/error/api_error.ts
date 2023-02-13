import { StatusCodes } from 'http-status-codes';
import BaseError from '../base_error'

class APIError extends BaseError {
    constructor(name: string, httpCode = StatusCodes.INTERNAL_SERVER_ERROR, isOperational = true, description = 'internal server error'){
        super(name, httpCode, isOperational, description)
    }
}

export default APIError;