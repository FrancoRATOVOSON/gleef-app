import { UserCircle } from 'lucide-react'
import React from 'react'

export function AppLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex size-full flex-col items-stretch justify-start gap-10 p-8">
      <header className="flex grow-0 items-center justify-between">
        <div className="shadow-xs flex items-center gap-2 rounded-xl border p-4">
          <UserCircle className="h-8 w-8" />
          <p className="ml-2">Welcome</p>
        </div>
      </header>
      <main className="flex size-full grow flex-col items-stretch justify-start">{children}</main>
    </div>
  )
}
