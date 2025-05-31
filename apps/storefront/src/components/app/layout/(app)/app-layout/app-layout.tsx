import { Button } from '#/components/ui/button'

import { Tooltip, TooltipContent, TooltipTrigger } from '#/components/ui/tooltip'

import { LogOut, UserCircle } from 'lucide-react'
import React from 'react'

interface AppLayoutProps extends React.PropsWithChildren {
  username: string
  onLogout: () => void
}

export function AppLayout({ username, onLogout, children }: AppLayoutProps) {
  return (
    <div className="flex size-full flex-col items-stretch justify-start gap-10 p-8">
      <header className="flex grow-0 items-center justify-between">
        <div className="shadow-xs flex items-center gap-2 rounded-xl border p-4">
          <UserCircle className="h-8 w-8" />
          <p className="ml-2">{username}</p>
        </div>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" onClick={onLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>LogOut</p>
          </TooltipContent>
        </Tooltip>
      </header>
      <main className="flex size-full grow flex-col items-stretch justify-start">{children}</main>
    </div>
  )
}
