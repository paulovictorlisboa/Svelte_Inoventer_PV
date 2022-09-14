import nodemailer from 'nodemailer';
import config from '../config';
import logger from '../logs/logger'

const transport = nodemailer.createTransport({
    host: config.EMAIL.HOST,
    port: config.EMAIL.PORT,
    auth: {
        user: config.EMAIL.USERNAME,
        pass: config.EMAIL.PASSWORD
    }
});

if (config.NODE_ENV !== 'test') {
    transport
    .verify()
    .then(() => logger.info('Connected to email server'))
    .catch(() => logger.warn('Unable to connect to email server. Make sure you have configured the SMTP options in .env'));
}


async function sendEmail(to: string, subject: string, text: string) {
    const msg = { from: config.EMAIL.FROM, to, subject, text };
    await transport.sendMail(msg);
}

export async function sendResetPasswordEmail(to: string, token: string) {

    const subject = 'Redefinição de Senha';

    const resetPasswordUrl = `http://localhost/auth/resetpassword?token=${token}`;
    const text = `Caro usuário,
    Para redefinir a sua senha, clique neste link: ${resetPasswordUrl}
    O link acima é válido por ${config.COOKIE.RESET_PASSWORD.EXPIRE_MINUTES} minutos. Se você não requisitou uma redefinição de senha, ignore este e-mail.`;
    await sendEmail(to, subject, text);
}

export async function sendVerificationEmail(to: string, token: string) {

    const subject = 'Verificação de E-mail';

    const verificationEmailUrl = `http://localhost/auth/verifyemail?token=${token}`;
    const text = `Caro usuário,
    Para verificar o seu e-mail, clique neste link: ${verificationEmailUrl}
    O link acima é válido por ${config.COOKIE.VERIFY_EMAIL.EXPIRE_MINUTES} minutos. Se você não criou uma conta, ignore estre e-mail.`;
    await sendEmail(to, subject, text);
}
