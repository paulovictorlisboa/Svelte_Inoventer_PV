import { ApiError } from "../utils/ApiError";
import logger from "./logger";
import type { Request, Response, NextFunction } from "express";

function errorConverter(error: Error | ApiError , request: Request, response: Response, next: NextFunction) {

    if( error instanceof ApiError ) {
        return next(error);
    }

    return next(new ApiError(500, error.message, true, error.stack));
}

function errorHandler(error: ApiError, request: Request, response: Response, next: NextFunction) {
    let { status, message } = error;
    
    if( error.critical ) {
        logger.error(error);
    }
            
    return response.status(status).json( { error: message } );
}

export default { errorConverter, errorHandler };