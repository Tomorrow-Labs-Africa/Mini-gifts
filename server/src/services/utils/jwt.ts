import * as jwt from 'jsonwebtoken';

import * as dotenv from 'dotenv';

dotenv.config();

const TOKEN_SECRET = process.env.JWT_TOKEN_SECRET || 'secret';

export const generateAccessToken = (phone:string, userId:string) => {
  return jwt.sign({ phone, userId }, TOKEN_SECRET, { expiresIn: '1800s' });
}