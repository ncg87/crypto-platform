// Authentication related types
export interface UserCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends UserCredentials {
  confirmPassword: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: {
    id: string;
    email: string;
  };
}

// You might also want to add:
export interface User {
  id: string;
  email: string;
  // Add other user properties as needed
} 