import type { Request, Response } from "express";
import bcrypt from 'bcrypt';
import database from '../database/connection'
import type { ForgotPassword, Login, Register, ResetPassword, UpdatePassword } from "../validation/schemas";
import { Token } from "../database/connection";
import config from "../config";
import { AccessPayload, generateToken, ResetPasswordPayload, verifyToken } from "../utils/Token";
import { sendResetPasswordEmail } from "../services/email.service";


export async function register(request: Request, response: Response) {
    const user = (request as Register).body;

    // verifica se o email já está cadastrado na database
    let res = await database.Users.GetByEmail(user.email);
    if( res !== null ) {
        return response.status(400).json({ error: "Email já cadastrado" });
    }

    // encripta a senha e salva na database
    const hash = await bcrypt.hash(user.password, 10);

    await database.Users.Insert(user.email, hash);

    return response.sendStatus(200);
}

export async function login(request: Request, response: Response) {
    const { email, password } = (request as Login).body;

    // busca o usuário na database
    const user = await database.Users.GetByEmail(email);
    if( user === null ) {
        return response.status(400).json({ error: "Usuário não existe" });
    }

    // verifica se a senha está certa
    if( !(await bcrypt.compare(password, user.password))){
        return response.status(401).json({ error: "Senha incorreta" });
    }

    // gera um token de acesso
    const accessid = await database.UsersTokens.Insert(user.id, Token.ACCESS);
    const payload = new AccessPayload(user.id, accessid, user.verified, user.subscribeduntil); 
    const token = generateToken(payload);

    return response.cookie(Token.ACCESS, token, config.COOKIE.OPTIONS).sendStatus(200);
}

export async function logout(request: Request, response: Response) {
    // extrai a id do token da sessão e deleta da database
    const accessid = (request.user as AccessPayload).tokenid;

    await database.UsersTokens.Delete(accessid);

    // remove o token do cliente
    return response.clearCookie(Token.ACCESS, config.COOKIE.OPTIONS).sendStatus(200);
}

// primeiro passo de redefinição de senha
// envia email para o usuário
export async function forgotPassword( request: Request, response: Response) {
    const { email } = (request as ForgotPassword).body;

    const user = await database.Users.GetByEmail(email);
    if (user === null) {
        return response.status(400).json({ "error": "User does not exist" });
    }

    const resetTokenId = await database.UsersTokens.Insert(user.id, Token.RESETPASSWORD);

    const resetToken = generateToken(new ResetPasswordPayload( user.id, resetTokenId ));

    sendResetPasswordEmail(email, resetToken);

    return response.sendStatus(200);
}

// segundo passo de redefinição de senha
// extrai o token da query e seta como cookie quando o usuário clicar no link do email
// redireciona o usuário para a página para que escolha sua nova senha
export async function resetPassword( request: Request, response: Response) {
    const { token } = (request as unknown as ResetPassword).query

    let verify = await verifyToken(token, Token.RESETPASSWORD);
    if (!verify.ok) {
        return response.redirect("/resetexpired");
    }
    const reset = verify.decoded;

    if ( !(await database.UsersTokens.Exists(reset.tokenid)) ) {
        return response.redirect("/resetexpired");
    }

    return response.cookie(Token.RESETPASSWORD, token, config.COOKIE.OPTIONS).redirect("/resetpassword");
}

// ultimo passo da redefinição de senha
// recebe um post com o cookie e nova senha
export async function updatePassword(request: Request, response: Response) {

    const token = (request as UpdatePassword).cookies.ResetPasswordToken;
    const password = (request as UpdatePassword).body.password;

    const verify = await verifyToken(token, Token.RESETPASSWORD);
    if (!verify.ok) {
        return response.status(401).json({ error: "Pedido inválido" });
    }

    const user = verify.decoded;

    const hash = await bcrypt.hash(password, 10);
    await database.Users.UpdatePassword(user.userid, hash);

    return response.sendStatus(200);
}

// // inicia a ação de verificação de e-mail
// // envia um link para o email com link de verificação
// export async function requestVerifyEmail(request: Request, response: Response) {

//     let { userid } = request.user as VerifyEmailPayload;

//     let result = await Database.User.GetById(userid);

//     if( result.length < 1) {
//         return response.sendStatus(400);
//     }
//     let user = result[0];

//     if( user.verified ) {
//         return response.sendStatus(400);
//     }

//     let newid = await database.UsersTokens.Insert(user.id, Token.);
//     let token = generateToken( new VerifyEmailPayload(user.id, newid) );

//     sendVerificationEmail(user.email, token);

//     return response.sendStatus(200);
// }

// // conclui a verificação de e-mail
// // verifica a conta do usuário quando clicar no link
// export async function verifyEmail(request: Request, response: Response) {
//     let { token } = request.query;

//     if( token === undefined) {
//         return response.sendStatus(400);
//     }

//     let verify = await verifyToken(token.toString(), tokenTypes.VERIFYEMAIL);

//     if( !verify.ok ) {
//         return response.redirect("/verifyemail?status=tokenexpired");
//     }

//     let dbToken = await Database.Tokens.Get(verify.decoded.userid);

//     if( dbToken[0][tokenTypes.VERIFYEMAIL] != token ) {
//         return response.redirect("/verifyemail?status=tokenexpired");
//     }

//     await Database.User.VerifyEmail(verify.decoded.userid);

//     return response.redirect("/verifyemail?status=ok");
// }