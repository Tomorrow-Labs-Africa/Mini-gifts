import express from 'express';
import TransactionController from '../controllers/transaction.controller';

const router = express.Router();

import isAuthenticatedMiddleware from '../middlewares/is-authenticated.middleware';
import verifyIsWebhookMiddleware from '../middlewares/verify-is-webhook.middleware';

// POST /transactions
router.post('/sendMobileMoney', TransactionController.sendMobileMoney);
router.post('/requestMobileMoney', TransactionController.requestMpesaPayment);
router.post(
  '/processMobileMoney',
  [verifyIsWebhookMiddleware],
  TransactionController.processMobileMoneyCollcetion
);
router.post(
  '/buyAirtime',
  [isAuthenticatedMiddleware],
  TransactionController.buyAirtime
);
router.post(
  '/sendToMpesaPaybill',
  [isAuthenticatedMiddleware],
  TransactionController.sendToMpesaPaybill
);
router.post(
  '/sendToMpesaTillNumber',
  [isAuthenticatedMiddleware],
  TransactionController.sendToMpesaTillNumber
);

export default router;
