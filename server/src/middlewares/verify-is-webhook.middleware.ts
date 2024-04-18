import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const TOKEN_SECRET = process.env.INTASEND_CHALLENGE_SECRET;


function verify (req: Request, res: Response, next: NextFunction) {
  if(!req.body.challenge) {
    return res.status(401).json({
      status: false,
      error: {
        message: 'Invalid challenge.'
      }
    });
  } else {
    const challenge = req.body.challenge;
    if(challenge !== TOKEN_SECRET) {
      return res.status(401).json({
        status: false,
        error: {
          message: 'Invalid challenge.'
        }
      });
    } else {
      next();
    }
  }
}

export default verify;
