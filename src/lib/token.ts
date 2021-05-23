import { SignOptions } from 'jsonwebtoken'
import * as jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/config';

export const createToken = async (id: string): Promise<string> => {
  const payload = {
    id,
  };

  const options: SignOptions = {
    issuer: 'FETCHING',
    expiresIn: '2 days',
  }

  return jwt.sign(payload, JWT_SECRET, options);
}

export const verifyToken = async (token: string): Promise<any> => await jwt.verify(token, JWT_SECRET);