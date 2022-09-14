import express, { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { authMiddleware, subscriptionMiddleware } from '../middlewares/auth';
import { validatorMiddleware } from '../validation/validator';
import * as auth from '../controllers/auth';
import * as schemas from '../validation/schemas';

const router = express.Router();

// login do usuário
router.post(
    '/login',
    validatorMiddleware(schemas.LoginSchema, 400),
    catchAsync(auth.login)
);

// registrar novo usuário
router.post(
    '/register',
    validatorMiddleware(schemas.RegisterSchema, 400),
    catchAsync(auth.register)
);

// logout
router.get(
    '/logout',
    validatorMiddleware(schemas.AccessSchema, 401),
    catchAsync(authMiddleware),
    catchAsync(auth.logout)
);

// checa se user está logado
router.get('/isauthenticated',
    validatorMiddleware(schemas.AccessSchema, 401),
    catchAsync(authMiddleware),
    async (request: Request, response: Response) => {
        response.sendStatus(200);
    }
);

// // inicia verificação de e-mail
// router.post(
//     '/verifyemail',
//     validatorMiddleware(schemas.AccessSchema, 401),
//     authMiddleware,
//     catchAsync()
// );

// // confirma verificação de email
// router.get(
//     '/verifyemail',
//     validatorMiddleware(schemas.VerifyEmailSchema),
//     catchAsync(auth.verifyEmail)
// );

// iniciar pedido de reset de senha
router.post(
    '/forgotpassword',
    validatorMiddleware(schemas.ForgotPasswordSchema, 400),
    catchAsync(auth.forgotPassword)
);

// continuar pedido de reset de senha
router.get(
    '/resetpassword',
    validatorMiddleware(schemas.ResetPasswordSchema, 400),
    catchAsync(auth.resetPassword)
);

// finalizar o reset de senha
router.post(
    '/resetpassword',
    validatorMiddleware(schemas.UpdatePasswordSchema, 400),
    catchAsync(auth.updatePassword)
);

// // verifica se o user pode acessar um determinadi overlay
// router.get(
//     '/checkoverlay/:overlayid', 
//     validatorMiddleware(schemas.AccessSchema),
//     authMiddleware,
//     catchAsync(auth.checkoverlay)
// );

export default router;
