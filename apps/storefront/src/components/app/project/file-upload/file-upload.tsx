import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '#/components/ui/tabs'
import { FileWithPreview, useImageUpload } from '#/hooks/use-image-upload'
import { cn } from '#/lib/utils'
import { FilePlus, Trash2, Upload, X } from 'lucide-react'
import React, { useCallback, useState } from 'react'

interface FileTabProps {
  files: Array<FileWithPreview>
  className?: string
  handleRemove: (previewUrl: string) => void
  handleThumbnailClick: () => void
}

function FileTab({ files, className, handleRemove, handleThumbnailClick }: FileTabProps) {
  return (
    <div className={className}>
      <Tabs defaultValue={files[0]?.previewUrl} className="size-full">
        <TabsList>
          {files.map(({ name, previewUrl }) => (
            <TabsTrigger key={previewUrl} value={previewUrl}>
              {name}
            </TabsTrigger>
          ))}
        </TabsList>

        {files.map(({ name, previewUrl, textContent }) => (
          <TabsContent value={previewUrl} key={previewUrl}>
            <div className="relative">
              <div className="bg-muted group relative h-64 overflow-auto rounded-lg border p-4">
                <pre className="whitespace-pre-wrap text-left font-mono text-xs">{textContent}</pre>
                <div className="absolute right-2 top-2 flex gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={handleThumbnailClick}
                    className="h-8 w-8 p-0"
                  >
                    <Upload className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleRemove(previewUrl)}
                    className="h-8 w-8 p-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              {name && (
                <div className="text-muted-foreground mt-2 flex items-center gap-2 text-sm">
                  <span className="truncate">{name}</span>
                  <button
                    onClick={() => handleRemove(previewUrl)}
                    className="hover:bg-muted ml-auto rounded-full p-1"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

interface FileUploadProps {
  onUpload?: (files: File[]) => void
}

export function FileUpload({ onUpload }: FileUploadProps) {
  const { files, fileInputRef, handleThumbnailClick, handleFileChange, handleRemove } =
    useImageUpload({
      onUpload
    })

  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)

      const file = e.dataTransfer.files?.[0]
      if (file && file.type.startsWith('image/')) {
        const fakeEvent = {
          target: {
            files: [file]
          }
        } as unknown as React.ChangeEvent<HTMLInputElement>
        handleFileChange(fakeEvent)
      }
    },
    [handleFileChange]
  )

  return (
    <div className="border-border bg-card w-full max-w-md space-y-6 rounded-xl border p-6 shadow-sm">
      <div className="space-y-0">
        <h3 className="text-lg font-medium">Upload Translation File</h3>
        <p className="text-muted-foreground text-sm">Supported format: JSON</p>
      </div>

      <Input
        type="file"
        accept="application/json"
        multiple
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      {files.length <= 0 ? (
        <div
          onClick={handleThumbnailClick}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            'border-muted-foreground/25 bg-muted/50 hover:bg-muted flex h-64 cursor-pointer flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed transition-colors',
            isDragging && 'border-primary/50 bg-primary/5'
          )}
        >
          <div className="bg-background rounded-full p-3 shadow-sm">
            <FilePlus className="text-muted-foreground h-6 w-6" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium">Click to select</p>
            <p className="text-muted-foreground text-xs">or drag and drop file here</p>
          </div>
        </div>
      ) : (
        <FileTab
          files={files}
          handleRemove={handleRemove}
          handleThumbnailClick={handleThumbnailClick}
        />
      )}
    </div>
  )
}
