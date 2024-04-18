import * as dotenv from 'dotenv';
import { generateReferenceCode } from '../utils/transaction-ref-code';
import { Transaction } from '../../models/transaction';
import { TransactionStatus } from '../../models/enums/transaction-status.enum';
import { TransactionTypes } from '../../models/enums/transaction-types.enum';

dotenv.config();

const IntaSend = require('intasend-node');
const TOKEN = process.env.INTASEND_SECRET_TOKEN;
const PUBLISHABLE_KEY = process.env.INTASEND_PUBLISHABLE_KEY;

const intasend = new IntaSend(PUBLISHABLE_KEY, TOKEN, false);

export const sendMobileMoney = async (
  phoneNumber: string,
  name: string,
  amount: number,
  narrative: string
) => {
  try {
    // Step 1: Initiate M-Pesa B2C
    const response = await intasend.payouts().mpesa({
      currency: 'KES',
      transactions: [
        {
          name,
          account: phoneNumber,
          amount: amount.toString(),
          narrative,
        },
      ],
    });

    //step 2: Approve and release payment
    return await intasend
      .payouts()
      .approve(response, false)
      .then((res: any) => {
        console.log(res);
        console.log('Payout approved');
        Transaction.create({
          status: TransactionStatus.Complete,
          type: TransactionTypes.SEND_MOBILE_MONEY,
          requestData: response,
          responseData: res,
        });
      })
      .catch((err: any) => {
        console.log(err);
      });
  } catch (err: any) {
    console.error(`Error sending mobile money payout:`, err);
    console.error(err.toString('ascii'));
  }
};

export const requestMpesaPayment = async (
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  amount: number,
  host: string = 'https://mini-util.co',
  apiRef: string = 'Collect'
) => {
  try {
    const response = await intasend.collection().mpesaStkPush({
      first_name: firstName,
      last_name: lastName,
      email: email,
      host: host,
      amount: amount,
      phone_number: phoneNumber,
      api_ref: apiRef,
    });
    console.log(
      `Mobile money payment request sent to ${firstName} ${lastName} (${phoneNumber}) for ${amount} KES`
    );
    console.log(`Request response:`, response);
    Transaction.create({
      status: TransactionStatus.Pending,
      type: TransactionTypes.REQUEST_MOBILE_MONEY,
      requestData: {
        firstName,
        lastName,
        email,
        phoneNumber,
        amount,
        host,
        apiRef,
      },
      responseData: response,
    });

    // await sendCUSD();
    return response;
  } catch (err: any) {
    console.log(err);
    console.log(err.toString('ascii'));
    return err;
  }
};

export const sendToMpesaPaybill = async (
  businessName: string,
  amount: number,
  paybillNumber: string,
  accountNumber: string,
  narrative: string
) => {
  try {
    const response = await intasend.payouts().mpesaB2B({
      currency: 'KES',
      transactions: [
        {
          name: businessName,
          account: paybillNumber,
          account_type: 'PayBill',
          account_reference: accountNumber,
          amount: amount,
          narrative: narrative ?? 'Purchase',
        },
      ],
    });
    console.log('Paybill B2B response: ');
    console.log(response);

    return await intasend
      .payouts()
      .approve(response, false)
      .then((res: any) => {
        console.log(res);
        console.log('Payout approved');
        Transaction.create({
          status: TransactionStatus.Complete,
          type: TransactionTypes.PAYBILL,
          requestData: response,
          responseData: res,
        });
      });
  } catch (err: any) {
    console.log(err);
    console.log(err.toString('ascii'));
  }
};

export const sendToMpesaTillNumber = async (
  businessName: string,
  amount: number,
  tillNumber: string,
  narrative: string
) => {
  try {
    const response = await intasend.payouts().mpesaB2B({
      currency: 'KES',
      transactions: [
        {
          name: businessName,
          account: tillNumber,
          account_type: 'TillNumber',
          amount: amount,
          narrative: narrative ?? 'Purchase',
        },
      ],
    });
    console.log('Till B2B response: ');
    console.log(response);

    return await intasend
      .payouts()
      .approve(response, false)
      .then((res: any) => {
        console.log(res);
        console.log('Payout approved');
        Transaction.create({
          status: TransactionStatus.Complete,
          type: TransactionTypes.BUY_GOODS,
          requestData: response,
          responseData: res,
        });
      });
  } catch (err: any) {
    console.log(err);
    console.log(err.toString('ascii'));
  }
};

export const checkPaymentStatus = async (invoiceId: string) => {
  try {
    const response = await intasend.collection().status(invoiceId);
    console.log(response);
    return response;
  } catch (err: any) {
    console.log(err);
    console.log(err.toString('ascii'));
  }
};

export const processMobileMoneyCollcetion = async (payload: any) => {
  console.log(
    `processing payment for inv id ${payload.invoice_id} with state ${payload.state}`
  );
  const transaction = await Transaction.findOne({
    'responseData.invoice.invoice_id': payload.invoice_id,
  });
  if (transaction) {
    //update transaction status
    switch (payload.state) {
      case 'COMPLETE':
        transaction.status = TransactionStatus.Complete;
        break;
      case 'PROCESSING':
        transaction.status = TransactionStatus.Processing;
        break;
      case 'FAILED':
        transaction.status = TransactionStatus.Failed;
        break;
      case 'PENDING':
        transaction.status = TransactionStatus.Pending;
        break;
      default:
        console.log('Unknown transaction state');
    }
    transaction.save();
  }
};
