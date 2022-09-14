import { Token } from "../database/connection";
import config from "../config";
import moment, { Moment } from "moment";
import jwt from 'jsonwebtoken';

class Payload {
    userid: string;
    tokenid: string
    type: string;
    expires: number;
    generated: number;

    constructor(
        userid: string,
        tokenid: string,
        type: string,
        expires: Moment,
        generated: Moment = moment()
    ){
        this.userid = userid;
        this.tokenid = tokenid;
        this.type = type;
        this.expires = expires.unix();
        this.generated = generated.unix();
    }
}

export class AccessPayload extends Payload {
    renew: number;
    emailverified: boolean;
    subscribeduntil: number;

    constructor(
        userid: string,
        tokenid: string,
        emailverified: boolean,
        subscribeduntil: number,
        generated: Moment = moment()
    ){
        super(userid, tokenid, Token.ACCESS, generated.clone().add(config.COOKIE.ACCESS.EXPIRE_HOURS, 'hours'), generated);

        this.renew = generated.clone().add(config.COOKIE.ACCESS.REFRESH_MINUTES, 'minutes').unix();
        this.emailverified = emailverified;
        this.subscribeduntil = subscribeduntil;
    }
    
}

export class ResetPasswordPayload extends Payload {

    constructor(userid: string, tokenid: string) {
        super(userid, tokenid, Token.RESETPASSWORD, moment().add(config.COOKIE.RESET_PASSWORD.EXPIRE_MINUTES, 'minutes'))
    }

}

export function generateToken(payload: Payload): string {
    return jwt.sign( {...payload}, config.COOKIE.JWT_SECRET );
}

export function verifyToken( token: string, type: string ): Promise<{ok: false, error: string} | {ok:true, decoded: Payload}> {
    
    return new Promise( (resolve, reject) => {
        jwt.verify( token, config.COOKIE.JWT_SECRET, (error, decoded: any) => {

            if( error ) {
                return resolve({ ok: false, error: "Bad Token" });
            }
            if( (decoded as Payload).type !== type ) {
                return resolve({ ok: false, error: "Wrong Token Type"})
            }
            if( moment.unix((decoded as Payload).expires).isBefore(moment()) ) {
                return resolve({ ok: false, error: "Token Expired" });
            }

            return resolve({ ok: true, decoded });
        })
    })
}