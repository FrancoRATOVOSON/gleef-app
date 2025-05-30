import { Button } from '#/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from '#/components/ui/dialog'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '#/components/ui/tooltip'
import React from 'react'
import { FileUpload } from './file-upload'
import { Loader } from 'lucide-react'

interface DialogProps {
  onSubmit: (files: File[]) => void
  isLoading?: boolean
}

export default function UploadDialog({ onSubmit, isLoading }: DialogProps) {
  const [files, setFiles] = React.useState<File[]>([])
  const [opnen, setOpen] = React.useState(false)

  const handleSubmit = () => {
    if (files) {
      onSubmit(files)
      setOpen(false)
    }
  }

  return (
    <Dialog open={opnen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button disabled={isLoading}>
                {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? 'Adding Translation' : 'Add Translation'}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-sm">Upload a translation file</div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DialogTrigger>
      <DialogContent>
        <FileUpload onUpload={setFiles} />
        <DialogFooter>
          <Button onClick={handleSubmit}>Add Translation</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
