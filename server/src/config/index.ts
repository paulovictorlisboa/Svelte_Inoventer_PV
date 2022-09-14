import z from 'zod';
import path from 'path';
import dotenv from 'dotenv';
import { CookieOptions } from 'express';

dotenv.config( {
    path: path.join(__dirname, '../../../.env')
});

const ConfigSchema = z.object({
    NODE_ENV: z.enum(['development', 'test', 'production']),

    SV_PORT: z.string().min(1).transform(Number),

    POSTGRES_HOST: z.string().min(1),
    POSTGRES_PORT: z.string().min(1).transform(Number),
    POSTGRES_USER: z.string().min(1),
    POSTGRES_PASSWORD: z.string().min(1),
    POSTGRES_DATABASE: z.string().min(1),

    JWT_SECRET: z.string().min(10),
    SECURE_COOKIE: z.enum(['false', 'true']),
    JWT_ACCESS_EXPIRE_HOURS: z.string().transform(Number),
    JWT_ACCESS_REFRESH_MINUTES: z.string().transform(Number),
    JWT_RESET_PASSWORD_EXPIRE_MINUTES: z.string().transform(Number),
    JWT_VERIFY_EMAIL_EXPIRE_MINUTES: z.string().transform(Number),

    MERCADOPAGO_PUBLIC_KEY: z.string().min(5),
    MERCADOPAGO_ACCESS_TOKEN: z.string().min(5),

    SMTP_HOST: z.string().min(5),
    SMTP_PORT: z.string().transform(Number),
    SMTP_USERNAME: z.string().email(),
    SMTP_PASSWORD: z.string().min(8),
    EMAIL_FROM: z.string().email()
});

const env = ConfigSchema.parse(process.env);

export default {
    NODE_ENV: env.NODE_ENV,
    SERVER: {
        PORT: env.SV_PORT
    },
    DATABASE: {
        HOST: env.POSTGRES_HOST,
        PORT: env.POSTGRES_PORT,
        USER: env.POSTGRES_USER,
        PASSWORD: env.POSTGRES_PASSWORD,
        DATABASE: env.POSTGRES_DATABASE
    },
    COOKIE: {
        ACCESS: {
            EXPIRE_HOURS: env.JWT_ACCESS_EXPIRE_HOURS,
            REFRESH_MINUTES: env.JWT_ACCESS_REFRESH_MINUTES
        },
        RESET_PASSWORD: {
            EXPIRE_MINUTES: env.JWT_RESET_PASSWORD_EXPIRE_MINUTES
        },
        VERIFY_EMAIL: {
            EXPIRE_MINUTES: env.JWT_VERIFY_EMAIL_EXPIRE_MINUTES
        },
        JWT_SECRET: env.JWT_SECRET,
        OPTIONS: {
            secure: env.SECURE_COOKIE == 'true',
            sameSite: 'strict'
        } as CookieOptions
    },
    EMAIL: {
        HOST: env.SMTP_HOST,
        PORT: env.SMTP_PORT,
        FROM: env.EMAIL_FROM,
        USERNAME: env.SMTP_USERNAME,
        PASSWORD: env.SMTP_PASSWORD
    },
    MERCADOPAGO: {
        PUBLIC_KEY: env.MERCADOPAGO_PUBLIC_KEY,
        PRIVATE_TOKEN: env.MERCADOPAGO_ACCESS_TOKEN
    }
};
