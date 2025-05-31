'use client'

import { AppLayout } from '#/components/app/layout/(app)/app-layout'
import { logout } from '#/services/auth'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'
import { useLocalStorage } from '@uidotdev/usehooks'

export default function LayoutComponent({ children }: React.PropsWithChildren) {
  const [username] = useLocalStorage('username')

  const router = useRouter()
  const { mutate } = useMutation({
    mutationFn: logout,
    onSuccess: () => router.push('/home'),
    onError: err => {
      console.error('Error on logout :', err)
      toast(`Error when loging out: ${err.message}`)
    }
  })

  return (
    <AppLayout onLogout={mutate} username={(username as string) ?? ''}>
      {children}
    </AppLayout>
  )
}
