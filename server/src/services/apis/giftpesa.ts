import axios from 'axios';
import * as fs from 'fs';
import * as crypto from 'crypto';

const GIFTPESA_API_KEY = process.env.GIFTPESA_API_KEY as string;

interface AuthenticationOptions {
  apiUrl: string;
  apiKey: string;
  username: string;
  pemFilePath: string;
}

function generateTimestamp(): string {
  const now = new Date();
  const year = now.getFullYear().toString();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  return `${year}${month}${day}${hours}${minutes}${seconds}`;
}

async function generateAccessToken(options: AuthenticationOptions): Promise<string> {
  try {

    const timestamp = generateTimestamp();

    const apiKeyTimestamp = `${options.apiKey}:${timestamp}`;

    const pemFileContent = fs.readFileSync(options.pemFilePath);

    const encryptedData = crypto.publicEncrypt(
      {
        key: pemFileContent,
        padding: crypto.constants.RSA_PKCS1_PADDING,
      },
      Buffer.from(apiKeyTimestamp)
    );


    const base64EncodedData = encryptedData.toString('base64');

    console.log('Requesting access token...');
    console.log('API URL:', options.apiUrl);
    console.log('Base64 Encoded Data:', base64EncodedData);
    console.log('Username:', options.username);
    const response = await axios.get(options.apiUrl, {
      headers: {
        Authorization: `Basic ${base64EncodedData}`,
        Username: options.username,
      },
    });

    return response.data.access_token;
  } catch (error: any) {
    console.error('Error generating access token:', error.message);
    throw error;
  }
}

export const gpDisburseVoucher = async (recipients: any) => {
  const options: AuthenticationOptions = {
    apiUrl: 'https://3api.giftpesa.com/authorize',
    apiKey: GIFTPESA_API_KEY,
    username: '',
    pemFilePath: '',
  };

  try {
    const accessToken = await generateAccessToken(options);
    console.log('Access Token:', accessToken);
    return recipients[0].Name;
  } catch (error: any) {
    console.error('Error:', error.message);
    throw error;
  }
};
