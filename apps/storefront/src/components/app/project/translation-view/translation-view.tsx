import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { ProjectType } from '#/types/projects'
import { TranslationTableData } from '#/types/translations'
import React from 'react'

interface TranslationViewProps {
  project: ProjectType
  onFileSelect: (file: File) => Promise<void>
  isFileUploadLoading: boolean
  translationEntries: TranslationTableData
}

export function TranslationView({ project }: TranslationViewProps) {
  return (
    <div>
      <h1>{project.name}</h1>
      <div>
        <Input type="file" />
        <Button>
          <a
            href={`/api/projects/${project.id}/translations/download`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Export
          </a>
        </Button>
      </div>
    </div>
  )
}
