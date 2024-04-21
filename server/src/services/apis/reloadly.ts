import axios from 'axios';

import { AccessToken } from '../../models/rl-access-token';
import { Transaction } from '../../models/transaction';
import { TransactionStatus } from '../../models/enums/transaction-status.enum';
import { TransactionTypes } from '../../models/enums/transaction-types.enum';

const RELOADLY_CLIENT_SECRET = process.env.RELOADLY_CLIENT_SECRET as string;
const RELOADLY_CLIENT_ID = process.env.RELOADLY_CLIENT_ID as string;
const RELOADLY_BASE_URL = 'https://giftcards-sandbox.reloadly.com'

async function listProducts(token: string, countryISO?: string): Promise<any> {
  let url = `${RELOADLY_BASE_URL}/products`;

  if (countryISO) {
    url = `${RELOADLY_BASE_URL}/countries/${countryISO.toLocaleLowerCase()}/products`;
  }
  console.log(url);

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;
  } catch (error: any) {
    console.error('Error:', error.message);
    throw new Error('An error occurred while listing products');
  }
}

async function getAccessToken(clientId: string, clientSecret: string): Promise<any> {
  try {
    const response = await axios.post(
      'https://auth.reloadly.com/oauth/token',
      {
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'client_credentials',
        audience: `${RELOADLY_BASE_URL}.reloadly.com`
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data;
  } catch (error: any) {
    console.error('Error:', error.message);
    throw new Error('An error occurred while fetching access token');
  }
}

async function generateAccessToken(): Promise<string> {
  try {
    const newAccessToken = await getAccessToken(RELOADLY_CLIENT_ID, RELOADLY_CLIENT_SECRET);
    const expiresIn = newAccessToken.expires_in;

    const expiresAt = new Date(Date.now() + expiresIn * 1000); // Convert expiresIn to milliseconds
    const accessToken = new AccessToken({ token: newAccessToken.access_token, expiresAt });
    await accessToken.save();

    return newAccessToken.access_token;
  } catch (error: any) {
    console.error('Error generating access token:', error.message);
    throw error;
  }
}

async function getValidAccessToken(): Promise<string> {
  const now = new Date();
  const accessToken = await AccessToken.findOne({ expiresAt: { $gt: now } }).sort({ expiresAt: 1 });

  if (accessToken) {
    return accessToken.token;
  } else {
    return await generateAccessToken();
  }
}

async function createGiftCardOrder(token: string, orderData: any): Promise<void> {
  try {
    const response = await axios.post(`${RELOADLY_BASE_URL}/orders`, orderData,{
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/com.reloadly.giftcards-v1+json'
        }
      });

    const order = new Transaction({
      type: TransactionTypes.GIFT_CARD_ORDER,
      status: TransactionStatus.Complete,
      requestData: orderData,
      responseData: response.data,
    });
    await order.save();

    return response.data;

  } catch (error: any) {
    console.error('Error creating gift card order:', error.message);
    throw error;
  }
}


export const rlListVouchers = async (options: any) => {
  try {
    const token = await getValidAccessToken()
    const countryISO = options.countryISO ? options.countryISO : undefined;
    const productList = await listProducts(token, countryISO);
    return productList;
  } catch (error: any) {
    console.error('Error:', error.message);
    return error.message;
  }
};


export const rlDisburseVoucher = async (orderData: any) => {
  try{
    const token = await getValidAccessToken()
    return await createGiftCardOrder(token, orderData)
  }
  catch(error: any){
    console.error('Error:', error.message);
    return error.message
  }
};