import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

// User interface matching the frontend type
export interface User {
  id: string;
  email: string;
  passwordHash: string;
  emailVerified: boolean;
  createdAt: string;
}

// Verification code interface
export interface VerificationCode {
  userId: string;
  code: string;
  expiresAt: Date;
}

// Password reset token interface
export interface PasswordResetToken {
  userId: string;
  token: string;
  expiresAt: Date;
}

// In-memory storage (will be replaced with Postgres later)
let users: User[] = [];
let verificationCodes: VerificationCode[] = [];
let passwordResetTokens: PasswordResetToken[] = [];

// Data access layer - this will be replaced with Postgres implementation later
export const userDataStore = {
  // Find user by email
  findByEmail: (email: string): User | undefined => {
    return users.find(user => user.email.toLowerCase() === email.toLowerCase());
  },

  // Find user by ID
  findById: (id: string): User | undefined => {
    return users.find(user => user.id === id);
  },

  // Create a new user
  create: async (email: string, plainPassword: string): Promise<User> => {
    const passwordHash = await bcrypt.hash(plainPassword, 10);
    const newUser: User = {
      id: uuidv4(),
      email: email.toLowerCase(),
      passwordHash,
      emailVerified: false,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    return newUser;
  },

  // Update user's email verification status
  verifyEmail: (userId: string): User | undefined => {
    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], emailVerified: true };
      return users[userIndex];
    }
    return undefined;
  },

  // Find verification code
  findCode: (code: string): VerificationCode | undefined => {
    return verificationCodes.find(vc => vc.code === code && vc.expiresAt > new Date());
  },

  // Create verification code
  createCode: (userId: string): string => {
    // Remove any existing codes for this user
    verificationCodes = verificationCodes.filter(vc => vc.userId !== userId);

    // Generate a 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const newCode: VerificationCode = {
      userId,
      code,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
    };

    verificationCodes.push(newCode);
    return code;
  },

  // Remove verification code after use
  removeCode: (code: string): void => {
    verificationCodes = verificationCodes.filter(vc => vc.code !== code);
  },

  // Create password reset token
  createPasswordResetToken: (userId: string): string => {
    // Remove any existing reset tokens for this user
    passwordResetTokens = passwordResetTokens.filter(prt => prt.userId !== userId);

    // Generate a unique token (in a real app, use crypto for better security)
    const token = uuidv4() + uuidv4(); // Concatenate two UUIDs for longer token
    const newToken: PasswordResetToken = {
      userId,
      token,
      expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
    };

    passwordResetTokens.push(newToken);
    return token;
  },

  // Find password reset token
  findPasswordResetToken: (token: string): PasswordResetToken | undefined => {
    return passwordResetTokens.find(prt => prt.token === token && prt.expiresAt > new Date());
  },

  // Remove password reset token after use
  removePasswordResetToken: (token: string): void => {
    passwordResetTokens = passwordResetTokens.filter(prt => prt.token !== token);
  },

  // Update user's password
  updatePassword: (userId: string, newPasswordHash: string): User | undefined => {
    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], passwordHash: newPasswordHash };
      return users[userIndex];
    }
    return undefined;
  },

  // Update user's email
  updateEmail: (userId: string, newEmail: string): User | undefined => {
    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], email: newEmail.toLowerCase() };
      return users[userIndex];
    }
    return undefined;
  },
};