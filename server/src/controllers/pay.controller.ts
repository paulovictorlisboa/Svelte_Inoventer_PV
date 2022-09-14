import type { Request, Response } from 'express';
import mercadopago from 'mercadopago';
import { AccessPayload } from '../utils/Token';
import config from '../config';
import database from '../database/connection'
import moment from 'moment';


// mercadopago.configurations.setAccessToken(config.mercadopago.access_token);

// export async function createPreference(request: Request, response: Response) {
    
//     // extrai id do user e plano desejado
//     let { userid } = request.user as AccessPayload;
//     let offer = request.body.offer;

//     // busca as informações do plano da DB
//     let offerInfo = ( await database.Offers.Get(offer) );

//     if( offerInfo.length != 1) {
//         return response.sendStatus(400);
//     }

//     // constroi o pedido
//     let preference = {
//         items : [{
//             title: offerInfo[0].title,
//             unit_price: Number(Number.parseFloat(offerInfo[0].price).toFixed(2)),
//             quantity: 1
//         }],
//         external_reference: JSON.stringify( { user: userid, offer: offerInfo[0].id } )
//     }

//     // registra o pedido no mercadopago
//     let order = await mercadopago.preferences.create(preference);

//     // retorna id do pedido registrado para o cliente pagar
//     return response.status(200).json( {id: order.body.id } );
// }

// export async function paymentWebhook(request: Request, response: Response) {

//     if( request.body.type !== "payment") {
//         return response.sendStatus(200);
//     }

//     // busca o status do pedido no sistema do mercadopago
//     let order = await mercadopago.payment.get(request.body.data.id);
//     let { id, external_reference, status } = order.body;
//     external_reference = JSON.parse(external_reference);

//     // busca o status atual do pedido na database
//     let dbOrder = await Database.Orders.Get(id);

//     // salva/atualiza o status do pedido na database
//     await Database.Orders.InsertUpdate(id, external_reference.user, external_reference.offer, status);

//     // se o status não for aprovado ou for igual ao status anterior não faz nada
//     if( status !== 'approved' || (dbOrder.length != 0 && dbOrder[0].status === status) ) {
//         return response.sendStatus(200);
//     }

//     // busca informações do plano da database
//     let offerInfo = ( await Database.Offers.Get(external_reference.offer) )[0];

//     // se o status atual for aprovado e o status anterior for diferente do atual
//     // adiciona o tempo à assinatura do cliente
//     let client = ( await Database.User.GetById(external_reference.user) )[0];
//     let subscription = moment.max(moment(), moment.unix(client.subscribeduntil)).add(offerInfo.days, 'days');

//     console.log('old sub:', moment.unix(client.subscribeduntil), 'new sub:', subscription);
    
//     await Database.User.UpdateSubscription(client.id, subscription.unix());

//     return response.sendStatus(200);
// }
