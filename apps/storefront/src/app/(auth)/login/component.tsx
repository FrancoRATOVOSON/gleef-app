'use client'

import { AuthForm } from '#/components/app/auth/auth-form'
import { login } from '#/services/auth'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function Login() {
  const router = useRouter()
  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: ({ id, username }) => {
      localStorage.setItem('id', id)
      localStorage.setItem('username', username)
      router.push('/home')
    },
    onError: err => {
      console.error('Error on login :', err)
      toast(`Error when registering: ${err.message}`)
    }
  })

  return (
    <div className="size-screen flex items-center justify-center">
      <AuthForm mode="login" onSubmit={mutate} isLoading={isPending} />
    </div>
  )
}
