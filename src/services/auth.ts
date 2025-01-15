import { AuthResponse, UserCredentials } from '@/types/auth'

export const authService = {
  async login(credentials: UserCredentials): Promise<AuthResponse> {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to login')
    }

    return response.json()
  },

  async register(credentials: UserCredentials): Promise<AuthResponse> {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to register')
    }

    return response.json()
  }
} 