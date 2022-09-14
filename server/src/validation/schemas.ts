import z from 'zod';
import { Token } from '../database/connection';

export type Login = z.infer<typeof LoginSchema>;
export const LoginSchema = z.object({
    body: z.object({
        email: z.string().email(),
        password: z.string().min(6).max(40)
    })
});

export type Register = z.infer<typeof RegisterSchema>;
export const RegisterSchema = z.object({
    body: z.object({
        email: z.string().email(),
        password: z.string().min(6).max(40),
            // .refine( value => value.length >= 8, { message: "A sua senha deve conter pelo menos 8 caracteres"})
            // .refine( value => value.match(/\d/) && value.match(/[a-zA-Z]/), { message: "A sua senha deve conter pelo menos 1 número e 1 letra"}),
        firstName: z.string().min(2).max(20),
        lastName: z.string().min(2).max(20)
    })
});

export type Access = z.infer<typeof AccessSchema>;
export const AccessSchema = z.object({
    cookies: z.object({
        [Token.ACCESS]: z.string()
    })
});

export type ForgotPassword = z.infer<typeof ForgotPasswordSchema>;
export const ForgotPasswordSchema = z.object({
    body: z.object({
        email: z.string().email()
    })
});

export type ResetPassword = z.infer<typeof ResetPasswordSchema>;
export const ResetPasswordSchema = z.object({
    query: z.object({
        token: z.string()
    })
});

export type UpdatePassword = z.infer<typeof UpdatePasswordSchema>;
export const UpdatePasswordSchema = z.object({
    body: z.object({
        password: z.string()
            .refine( value => value.length >= 8, { message: "A sua senha deve conter pelo menos 8 caracteres"})
            .refine( value => value.match(/\d/) && value.match(/[a-zA-Z]/), { message: "A sua senha deve conter pelo menos 1 número e 1 letra"})
    }),
    cookies: z.object({
        [Token.RESETPASSWORD]: z.string()
    })
});

export type VerifyEmail = z.infer<typeof VerifyEmailSchema>;
export const VerifyEmailSchema = z.object({
    query: z.object({
        token: z.string()
    })
})

export type PaymentWebhook = z.infer<typeof PaymentWebhookSchema>;
export const PaymentWebhookSchema = z.object({
    body: z.object({
        type: z.string(),
        data: z.object({
            id: z.string()
        })
    })
});
