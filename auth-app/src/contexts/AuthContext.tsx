import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthContextType, User, LoginCredentials, RegisterData } from '../types/auth';
import { apiClient } from '../api/apiClient';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in on initial load
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token is still valid
      apiClient
        .get('/auth/me')
        .then((response) => {
          if (response.success && response.data) {
            setUser(response.data as User);
          } else {
            // Token is invalid, remove it
            localStorage.removeItem('token');
          }
        })
        .catch(() => {
          // If request fails, remove token
          localStorage.removeItem('token');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      const response = await apiClient.post('/auth/login', credentials);
      if (response.success && response.data) {
        const { token, user } = response.data as { token: string; user: User };
        localStorage.setItem('token', token);
        setUser(user);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    try {
      const response = await apiClient.post('/auth/register', userData);
      return response.success;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const verifyEmail = async (code: string): Promise<boolean> => {
    try {
      const response = await apiClient.post('/auth/verify-email', { code });
      if (response.success && response.data) {
        // Automatically log in the user after email verification
        const { token: newToken, user } = response.data as { token: string; user: User };
        localStorage.setItem('token', newToken);
        setUser(user);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Email verification error:', error);
      return false;
    }
  };

  const forgotPassword = async (email: string): Promise<boolean> => {
    try {
      const response = await apiClient.post('/auth/forgot-password', { email });
      return response.success;
    } catch (error) {
      console.error('Forgot password error:', error);
      return false;
    }
  };

  const resetPassword = async (token: string, newPassword: string): Promise<boolean> => {
    try {
      const response = await apiClient.post('/auth/reset-password', { token, newPassword });
      return response.success;
    } catch (error) {
      console.error('Reset password error:', error);
      return false;
    }
  };

  const updateEmail = async (newEmail: string): Promise<boolean> => {
    try {
      const response = await apiClient.put('/auth/update-email', { newEmail });
      if (response.success && response.data) {
        // Update the user in context with new email
        setUser(prev => prev ? { ...prev, email: newEmail } : null);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Update email error:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    register,
    verifyEmail,
    forgotPassword,
    resetPassword,
    updateEmail,
    isAuthenticated: !!user,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};