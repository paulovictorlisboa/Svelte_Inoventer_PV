import { AccessPayload } from "./Token";

declare module 'express' {
    export interface Request {
        user?: AccessPayload
    }
}