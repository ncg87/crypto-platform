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

interface RegisterDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onLoginClick: () => void
}

interface FormData {
  email: string
  password: string
  confirmPassword: string
}

export function RegisterDialog({ open, onOpenChange, onLoginClick }: RegisterDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { register: signUp } = useAuth()
  const { register, handleSubmit } = useForm<FormData>()
  const { toast } = useToast()

  const onSubmit = async (data: FormData) => {
    if (data.password !== data.confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match.',
        variant: 'destructive',
      })
      return
    }

    setIsLoading(true)
    try {
      await signUp(data.email, data.password)
      onOpenChange(false)
      toast({
        title: 'Success',
        description: 'Your account has been created.',
      })
    } catch (error) {
      console.error(error)
      toast({
        title: 'Error',
        description: 'Failed to create account.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create an account</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Email"
              {...register('email', { required: true })}
            />
          </div>
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Password"
              {...register('password', { required: true })}
            />
          </div>
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Confirm Password"
              {...register('confirmPassword', { required: true })}
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Create Account'}
          </Button>
          <div className="text-center text-sm">
            <Button variant="link" onClick={onLoginClick} type="button">
              Already have an account? Login
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
} 