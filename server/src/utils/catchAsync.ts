import type { Request, Response, NextFunction, RequestHandler } from "express";

export function catchAsync(fn: RequestHandler)  {
    return (request: Request, response: Response, next: NextFunction) => {
        Promise.resolve(fn(request, response, next)).catch( (error) => next(error) )
    }
}
