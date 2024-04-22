import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const TOKEN_SECRET = process.env.JWT_TOKEN_SECRET as string;
const VALID_API_KEY = process.env.VALID_API_KEY as string;


function check (req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];

  // IF no auth headers are provided
  // THEN return 401 Unauthorized error
  if (!authHeader) {
    return res.status(401).json({
      status: false,
      error: {
        message: 'Auth headers not provided in the request.'
      }
    });
  }

  // IF bearer auth header is not provided
  // THEN return 401 Unauthorized error
  if (!authHeader.startsWith('Bearer')) {
    return res.status(401).json({
      status: false,
      error: {
        message: 'Invalid auth mechanism.'
      }
    });
  }

  const token = authHeader.split(' ')[1];

  // IF bearer auth header is provided, but token is not provided
  // THEN return 401 Unauthorized error
  if (!token) {
    return res.status(401).json({
      status: false,
      error: {
        message: 'Bearer token missing in the authorization headers.'
      }
    })
  }

  if (token == VALID_API_KEY) {
    next();
  } else {
    return res.status(403).json({
      status: false,
      error: 'Invalid access token provided, please login again.'
    });
  }
}

export default check;
