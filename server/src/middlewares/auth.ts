import type { Request, Response, NextFunction, CookieOptions } from 'express';
import moment from 'moment';
import { Token } from '../database/connection';
import { AccessPayload, generateToken, verifyToken } from '../utils/Token';
import { Access } from '../validation/schemas';
import database from '../database/connection'
import config from '../config';


export async function authMiddleware( request: Request, response: Response, next: NextFunction) {

    // verifica se token válido
    let payload = await verifyToken( (request as Access).cookies.AccessToken, Token.ACCESS );
    if( !payload.ok ){
        return response.status(401).json({ error: "Token Inválido" });
    }

    const user = payload.decoded as AccessPayload;
    request.user = user;

    // verifica se token precisa de refresh
    // se não precisar renovar, não faz mais nada
    if( ! moment.unix(user.renew).isBefore(moment()) ) {
        return next();
    }

    // verifica na database se o token ainda é valido
    if( !(await database.UsersTokens.Exists(user.tokenid))) {
        // se não estiver na db, rejeita o request
        return response.clearCookie(Token.ACCESS, config.COOKIE.OPTIONS).status(401).json({ error: "Sessão Expirou" });
    }

    // se estiver, renova o token normalmente
    const newpayload = new AccessPayload(user.userid, user.tokenid, user.emailverified, user.subscribeduntil);
    const newtoken = generateToken(newpayload);

    response.cookie(Token.ACCESS, newtoken, config.COOKIE.OPTIONS);
    request.user = newpayload;

    return next();
}

// permite passagem apenas de usuários com assinatura válida
// deve ser utilizado apenas após o middleware de autenticação "authMiddleware"
export async function subscriptionMiddleware(request: Request, response: Response, next: NextFunction) {
    const user = request.user as AccessPayload;

    if( moment.unix(user.subscribeduntil).isAfter(moment())  ) {
        return next();
    }

    return response.sendStatus(403);
}
