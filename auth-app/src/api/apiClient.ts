import { ApiResponse } from '../types/auth';

// Base API client to handle requests
class ApiClient {
  private baseUrl: string;

  constructor() {
    // In development, we'll proxy to our backend server
    this.baseUrl = '/api';
  }

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    const token = localStorage.getItem('token');

    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    } as Record<string, string>;

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      // If the response is 401, remove the token and redirect to login
      if (response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
        return { success: false, error: 'Unauthorized' };
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request error:', error);
      return { success: false, error: 'Network error' };
    }
  }

  get<T>(endpoint: string) {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  post<T>(endpoint: string, data?: any) {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  put<T>(endpoint: string, data?: any) {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  delete<T>(endpoint: string) {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const apiClient = new ApiClient();