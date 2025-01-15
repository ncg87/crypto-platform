'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { useForm } from 'react-hook-form'

interface LoginDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onRegisterClick: () => void
}

interface FormData {
  email: string
  password: string
}

export function LoginDialog({ open, onOpenChange, onRegisterClick }: LoginDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const { toast } = useToast()
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    try {
      await login(data.email, data.password)
      onOpenChange(false)
      toast({
        title: 'Success',
        description: 'You have been logged in.',
      })
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: 'Error',
          description: error.message || 'Invalid email or password.',
          variant: 'destructive',
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Email"
              {...register('email', { required: true })}
            />
            {errors.email && (
              <span className="text-sm text-red-500">Email is required</span>
            )}
          </div>
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Password"
              {...register('password', { required: true })}
            />
            {errors.password && (
              <span className="text-sm text-red-500">Password is required</span>
            )}
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Login'}
          </Button>
          <div className="text-center text-sm">
            <Button
              variant="link"
              onClick={onRegisterClick}
              type="button"
            >
              Don&apos;t have an account? Sign up
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
} 