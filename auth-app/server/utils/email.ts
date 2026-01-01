import nodemailer from 'nodemailer';

// Create a transporter for sending emails
// In a real application, you would configure this with actual email service credentials
const transporter = nodemailer.createTransporter({
  // For development, we'll use ethereal.email as a test service
  // In production, you would use a real email service like SendGrid, Mailgun, etc.
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER || 'your_test_email@ethereal.email', // generated ethereal user
    pass: process.env.EMAIL_PASS || 'your_test_password', // generated ethereal password
  },
});

/**
 * Send a password reset email to the user
 * @param email - The user's email address
 * @param resetToken - The password reset token
 */
export const sendPasswordResetEmail = async (email: string, resetToken: string): Promise<boolean> => {
  try {
    // In a real application, you would construct the reset URL with your frontend URL
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password/${resetToken}`;
    
    const mailOptions = {
      from: process.env.EMAIL_FROM || '"Password Reset" <no-reply@yourapp.com>',
      to: email,
      subject: 'Password Reset Request',
      html: `
        <h2>Password Reset Request</h2>
        <p>You requested a password reset for your account.</p>
        <p>Click the link below to reset your password:</p>
        <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #3b82f6; color: white; text-decoration: none; border-radius: 4px;">Reset Password</a>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Password reset email sent: %s', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return false;
  }
};

/**
 * Send a verification email to the user
 * @param email - The user's email address
 * @param verificationCode - The verification code
 */
export const sendVerificationEmail = async (email: string, verificationCode: string): Promise<boolean> => {
  try {
    const verificationUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/verify-email`;
    
    const mailOptions = {
      from: process.env.EMAIL_FROM || '"Email Verification" <no-reply@yourapp.com>',
      to: email,
      subject: 'Email Verification',
      html: `
        <h2>Email Verification</h2>
        <p>Thank you for registering. Please verify your email address.</p>
        <p>Enter the following code on the verification page:</p>
        <div style="font-size: 24px; font-weight: bold; margin: 20px 0; letter-spacing: 5px;">${verificationCode}</div>
        <p>Or click the link below to verify your email:</p>
        <a href="${verificationUrl}" style="display: inline-block; padding: 10px 20px; background-color: #3b82f6; color: white; text-decoration: none; border-radius: 4px;">Verify Email</a>
        <p>This code will expire in 10 minutes.</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Verification email sent: %s', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending verification email:', error);
    return false;
  }
};