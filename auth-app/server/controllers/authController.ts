import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import { userDataStore } from '../models/User';
import { generateToken } from '../utils/jwt';
import { AuthenticatedRequest } from '../middleware/auth';

// Register a new user
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Check if user already exists
    const existingUser = userDataStore.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    // Create new user
    const newUser = await userDataStore.create(email, password);

    // Create verification code
    const verificationCode = userDataStore.createCode(newUser.id);

    // Log the verification code to console
    console.log(`Verification code for ${email}: ${verificationCode}`);

    res.status(201).json({
      success: true,
      message: 'User registered successfully. Please check console for verification code.'
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Login user
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Find user by email
    const user = userDataStore.findByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate JWT token
    const token = generateToken(user);

    res.json({
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          emailVerified: user.emailVerified,
          createdAt: user.createdAt
        }
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Verify email
export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({
        success: false,
        message: 'Verification code is required'
      });
    }

    // Find the verification code
    const verificationCode = userDataStore.findCode(code);
    if (!verificationCode) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired verification code'
      });
    }

    // Verify the user's email
    const user = userDataStore.verifyEmail(verificationCode.userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User not found'
      });
    }

    // Remove the used code
    userDataStore.removeCode(code);

    // Generate a new JWT token for the verified user
    const newToken = generateToken(user);

    res.json({
      success: true,
      message: 'Email verified successfully',
      data: {
        token: newToken,
        user: {
          id: user.id,
          email: user.email,
          emailVerified: user.emailVerified,
          createdAt: user.createdAt
        }
      }
    });
  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get current user info
export const getCurrentUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        message: 'User not authenticated' 
      });
    }

    res.json({ 
      success: true, 
      data: {
        id: req.user.id,
        email: req.user.email,
        emailVerified: req.user.emailVerified,
        createdAt: req.user.createdAt
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
};