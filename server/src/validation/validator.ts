import type { Request, Response, NextFunction, RequestHandler } from 'express';
import type { AnyZodObject } from 'zod';
import { ApiError } from '../utils/ApiError';


export function validatorMiddleware (schema: AnyZodObject, statusIfFailure: number = 400) {

    return async function(request: Request, response: Response, next: NextFunction) {

        let v = await schema.safeParseAsync({
            body: request.body,
            query: request.query,
            cookies: request.cookies,
            params: request.params
        });
        if( v.success ) {
            return next();
        }
        else {
            let e = v.error.issues[0];

            return next(new ApiError(statusIfFailure, `${e.path.join('.')} - ${e.message}`, false));
        }
    }
}
