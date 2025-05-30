import { useCallback, useEffect, useRef, useState } from 'react'

interface UseImageUploadProps {
  onUpload?: (files: File[]) => void
}

export type FileWithPreview = { textContent: string; previewUrl: string; name: string; file: File }

export function useImageUpload({ onUpload }: UseImageUploadProps = {}) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [files, setFiles] = useState<Array<FileWithPreview>>([])

  const handleThumbnailClick = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const handleFileChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const fileList: Array<FileWithPreview> = []
        for (const file of Array.from(event.target.files)) {
          fileList.push({
            name: file.name,
            previewUrl: URL.createObjectURL(file),
            textContent: await file.text(),
            file: file
          })
        }
        setFiles(fileList)
        onUpload?.(fileList.map(f => f.file))
      } else setFiles([])
    },
    [onUpload]
  )

  const handleRemove = useCallback(
    (previewUrl: string) => {
      const currentFiles = files.filter(file => file.previewUrl !== previewUrl)
      setFiles(currentFiles)
      onUpload?.(currentFiles.map(f => f.file))
      URL.revokeObjectURL(previewUrl)
    },
    [files, onUpload]
  )

  useEffect(() => {
    return () => {
      if (files.length) files.forEach(file => URL.revokeObjectURL(file.previewUrl))
    }
  }, [files])

  return {
    files,
    fileInputRef,
    handleThumbnailClick,
    handleFileChange,
    handleRemove
  }
}
