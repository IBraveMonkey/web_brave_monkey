// User type definition
export interface User {
  id: string;
  email: string;
  emailVerified: boolean;
  createdAt: string; // ISO string
}

// Login credentials
export interface LoginCredentials {
  email: string;
  password: string;
}

// Registration data
export interface RegisterData {
  email: string;
  password: string;
}

// API response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Auth context type
export interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  register: (userData: RegisterData) => Promise<boolean>;
  verifyEmail: (code: string) => Promise<boolean>;
  isAuthenticated: boolean;
  loading: boolean;
}