import { NextFunction, Request, Response } from "express";
import User from "../../entity/user";
import HttpError from "../../error/httpError";
import UserService from "../../service/user.service";
import httpErrorHandler from "../handler/httpErrorHandler";
import { verifyToken } from "../token";

export const authHost = async (req: Request, res: Response, next: NextFunction) => {
  const id: string = await validateToken(req, res) as string;
  const userService: UserService = new UserService();

  const host: User = await userService.getHost(id);
  if (host === undefined) {
    res.status(403).json({
      message: '권한 없음',
    });
    return;
  }
  
  req.hostId = id;
  next();
}

export const authUser = async (req: Request, res: Response, next: NextFunction) => {
  const id: string = await validateToken(req, res) as string;
  const userService: UserService = new UserService();

  const user: User = await userService.getUser(id);
  if (user === undefined) {
    res.status(403).json({
      message: '권한 없음',
    });
    return;
  }
  
  req.userId = id;
  next();
}

const validateToken = async (req: Request, res: Response): Promise<string | undefined> => {
    const token: string | string[] | undefined = req.headers['x-access-token'];
    try {
      if (token === undefined) {
        throw new Error('jwt must be provided');
      }
  
      if (Array.isArray(token)) {
        throw new Error('token is array');
      }
  
      const decoded = await verifyToken(token);
  
      return decoded.id;
    } catch (err) {
  
      let code;
      let message;
  
      switch (err.message) {
        case 'jwt must be provided':
        case 'token is array':
        case 'jwt malformed':
        case 'invalid token':
        case 'invalid signature':
        case 'invalid signature':
          code = 401;
          message = '위조된 토큰';
          break;
  
        case 'jwt expired':
          code = 410;
          message = '만료된 토큰';
          break;
  
        case 'no user':
          code = 404;
          message = '회원 없음';
          break;
  
        default:
          code = 500;
          message = '서버 오류';
      }
  
      httpErrorHandler(res, new HttpError(code, message));
    }
  }