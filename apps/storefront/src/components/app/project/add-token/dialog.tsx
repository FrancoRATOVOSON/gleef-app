import { Button } from '#/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '#/components/ui/dialog'
import { Tooltip, TooltipContent, TooltipTrigger } from '#/components/ui/tooltip'
import { Loader, Plus } from 'lucide-react'
import { AddToken, AddTokenProps } from './add-token'
import { useCallback, useState } from 'react'

export default function AddTokenDialog({
  fullKey,
  locales,
  onSubmit,
  isSubmitting
}: AddTokenProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = useCallback(
    (fullKey: string, values: { [locales: string]: string | null }) => {
      setIsOpen(false)
      return onSubmit(fullKey, values)
    },
    [onSubmit]
  )

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon">
              {isSubmitting ? (
                <Loader className="size-4 animate-spin" />
              ) : (
                <Plus className="size-4" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add new key/token</p>
          </TooltipContent>
        </Tooltip>
      </DialogTrigger>
      <DialogContent>
        <AddToken
          isSubmitting={isSubmitting}
          fullKey={fullKey}
          locales={locales}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  )
}
