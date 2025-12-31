import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { userDataStore, User } from '../models/User';

export interface AuthenticatedRequest extends Request {
  user?: User;
}

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ success: false, message: 'Access token required' });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(403).json({ success: false, message: 'Invalid or expired token' });
  }

  // Find user by ID from token
  const user = userDataStore.findById(decoded.userId);
  if (!user) {
    return res.status(401).json({ success: false, message: 'User not found' });
  }

  req.user = user;
  next();
};