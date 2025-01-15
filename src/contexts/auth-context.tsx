'use client'

import { createContext, useContext, useState } from 'react'
import { authService } from '@/services/auth'
import { User } from '@/types/auth'

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = async (email: string, password: string) => {
    const response = await authService.login({ email, password })
    if (response.user) {
      setUser(response.user)
      localStorage.setItem('auth_token', response.token || '')
    }
  }

  const register = async (email: string, password: string) => {
    const response = await authService.register({ email, password })
    if (response.user) {
      setUser(response.user)
      localStorage.setItem('auth_token', response.token || '')
    }
  }

  const logout = () => {
    localStorage.removeItem('auth_token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 