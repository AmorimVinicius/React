import express from 'express';
import controller from '../controller/accountController.js';

const app = express();

//
//
//
// ROUTES
app.get('/account', controller.findAll);
app.get('/account/balance', controller.balance);
app.get('/account/transfer', controller.transfer);
app.get('/account/media', controller.mediaBalance);
app.post('/account/deposit', controller.deposit);
app.post('/account/draft', controller.draft);
app.delete('/account/remove', controller.remove);

export { app as accountRouter };
