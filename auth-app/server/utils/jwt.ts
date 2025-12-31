import * as jwt from 'jsonwebtoken';
import { User } from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_jwt_secret_for_development';

// Generate JWT token
export const generateToken = (user: User): string => {
  return jwt.sign(
    { userId: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
};

// Verify JWT token
export const verifyToken = (token: string): { userId: string; email: string } | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string; email: string };
  } catch (error) {
    console.error('Token verification error:', error);
    return null;
  }
};