'use client'

import { TranslationView } from '#/components/app/project/translation-view'
import React from 'react'
import {
  useAddTranslation,
  useChangeTranslation,
  useFileUpload,
  useGetLocales,
  useGetProject,
  useGetTranslations
} from './hooks'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface ProjectComponentProps {
  id: string
}

export default function ProjectPageComponent({ id }: ProjectComponentProps) {
  const availableLocales = useGetLocales(id)
  const translationEntries = useGetTranslations(id)
  const { onTranslationChange } = useChangeTranslation()
  const { isAddSubmitting, onAddTranslation } = useAddTranslation()
  const { isFileUploadLoading, onFileSelect } = useFileUpload()
  const project = useGetProject(id)
  const router = useRouter()

  if (!project) {
    // router.push('/home')
    toast('Something went wrong while fetching project details')
    return <div>Nothing here</div>
  }

  return (
    <TranslationView
      availableLocales={availableLocales}
      translationEntries={translationEntries}
      onTranslationChange={onTranslationChange}
      isAddSubmitting={isAddSubmitting}
      onAddTranslation={(fullKey, values) => onAddTranslation(id, fullKey, values)}
      isFileUploadLoading={isFileUploadLoading}
      onFileSelect={files => onFileSelect({ projectId: id, files })}
      project={project}
    />
  )
}
