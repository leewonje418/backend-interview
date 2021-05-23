import 'dotenv';

declare global {
  namespace Express {
    interface Request {
      hostId: string;
      userId: string;
    }
  }
}