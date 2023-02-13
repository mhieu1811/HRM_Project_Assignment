import { StatusCodes } from 'http-status-codes';
import BaseError from '../base_error'

class Http400Error extends BaseError {
    constructor(description = 'bad request'){
        super('NOT FOUND', StatusCodes.BAD_REQUEST, true, description)
    }
}

export default Http400Error;