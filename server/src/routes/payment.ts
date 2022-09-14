// import express from 'express';
// import { authMiddleware } from '../middlewares/auth';
// import { createPreference, paymentWebhook } from '../controllers/pay.controller';
// import * as schemas from '../validation/schemas';
// import { validatorMiddleware } from '../validation/validator';
// import { catchAsync } from '../utils/catchAsync';

// const router = express.Router();

// // inicia um pedido para o usuário
// router.post('/createpreference',
//     validatorMiddleware(schemas.AccessSchema),
//     validatorMiddleware(schemas.CreatePreferenceSchema),
//     authMiddleware,
//     catchAsync(createPreference)
// );

// // recebe atualizações sobre o status de pagamento dos pedidos
// router.post('/update', validatorMiddleware(schemas.PaymentWebhookSchem), catchAsync(paymentWebhook));


// export default router;
