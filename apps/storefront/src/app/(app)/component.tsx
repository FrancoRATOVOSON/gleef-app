'use client'

import { AppLayout } from '#/components/app/layout/(app)/app-layout'
import { logout } from '#/services/auth'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'
import { useLocalStorage } from '@uidotdev/usehooks'

export default function LayoutComponent({ children }: React.PropsWithChildren) {
  const [username] = useLocalStorage('username', null)

  const router = useRouter()
  const { mutate } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      localStorage.clear()
      router.push('/')
    },
    onError: err => {
      console.error('Error on logout :', err)
      toast(`Error when loging out: ${err.message}`)
    }
  })

  if (!username) {
    localStorage.clear()
    router.push('/')
    toast('You need to log in to navigate this  page')
    return null
  }

  return (
    <AppLayout onLogout={mutate} username={username}>
      {children}
    </AppLayout>
  )
}
