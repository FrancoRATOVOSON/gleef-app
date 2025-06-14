import { Button } from '#/components/ui/button'

import { ProjectType } from '#/types/projects'
import { TranslationTableData } from '#/types/translations'
import React from 'react'
import { FileUploadDialog } from '../file-upload'
import { TranslationTable } from '../translation-table'

interface TranslationViewProps {
  project: ProjectType
  onFileSelect: (files: File[]) => void
  isFileUploadLoading: boolean
  translationEntries: TranslationTableData
  availableLocales: string[]
  onTranslationChange: (id: string, locale: string, value: string) => void
  onAddTranslation: (fullKey: string, values: { [locales: string]: string | null }) => void
  isAddSubmitting: boolean
}

export function TranslationView({
  project,
  onFileSelect,
  isFileUploadLoading,
  translationEntries,
  availableLocales,
  onTranslationChange,
  onAddTranslation,
  isAddSubmitting
}: TranslationViewProps) {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">{project.name}</h1>
      <div className="flex items-center gap-4">
        <FileUploadDialog onSubmit={onFileSelect} isLoading={isFileUploadLoading} />
        <Button variant="outline" asChild>
          <a
            href={`/api/projects/${project.id}/translations/download`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Export
          </a>
        </Button>
      </div>
      <div>
        <TranslationTable
          data={translationEntries}
          availableLocales={availableLocales}
          onTranslationChange={onTranslationChange}
          onAddTranslation={onAddTranslation}
          isAddSubmitting={isAddSubmitting}
        />
      </div>
    </div>
  )
}
