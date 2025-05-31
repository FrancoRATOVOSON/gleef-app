import { Meta, StoryObj } from '@storybook/react'
import { TranslationView } from './translation-view'
import React, { useCallback, useState } from 'react'
import { LocaleTranslations, TranslationEntry } from '#/types/translations'
import { mergeTranslationsForTable } from '../translation-table/utils'

const meta: Meta<typeof TranslationView> = {
  title: 'Components/Translation/TranslationView',
  component: TranslationView
}

export default meta

type Story = StoryObj<typeof TranslationView>

const RenderFunction = () => {
  const [translations, setTranslations] = useState<TranslationEntry[]>([])
  const [locales, setLocales] = useState<string[]>([])
  const [isFileUploadLoading, setIsFileUploadLoading] = useState(false)
  const [isAddSubmitting, setIsAddSubmitting] = useState(false)

  const onTranslationChange = useCallback(
    (id: string, locale: string, value: string) => {
      const currentTranslation = translations.find(translation => translation.id === id)

      if (currentTranslation)
        setTranslations(prevTranslations =>
          prevTranslations.map(translation => {
            if (translation.id === currentTranslation.id) {
              currentTranslation[locale] = value
              return { ...translation, ...currentTranslation }
            }
            return translation
          })
        )
    },
    [translations]
  )

  const onFileSelect = useCallback(
    async (files: File[]) => {
      setIsFileUploadLoading(true)

      const newLocales: Array<string> = []
      const newLocaleTranslations: LocaleTranslations = {}
      for (const file of files) {
        const fileText = await file.text()
        newLocales.push(file.name)
        newLocaleTranslations[file.name] = JSON.parse(fileText)
      }
      const newTranslations = mergeTranslationsForTable(translations, newLocaleTranslations)

      setLocales(prevLocales => Array.from(new Set([...prevLocales, ...newLocales])))
      setTranslations(newTranslations)
      setIsFileUploadLoading(false)
    },
    [translations]
  )

  const onAddTranslation = useCallback(
    (fullKey: string, values: { [locales: string]: string | null }) => {
      return new Promise<void>(() => {
        setIsAddSubmitting(true)

        setTimeout(() => console.log(`Created ${fullKey} with ${JSON.stringify(values)}`), 3_000)
        setIsAddSubmitting(false)
      })
    },
    []
  )

  return (
    <TranslationView
      project={{
        id: '4Z3RTYU8',
        name: 'Sample Project',
        createdAt: '2023-10-01T12:00:00Z'
      }}
      availableLocales={locales}
      isFileUploadLoading={isFileUploadLoading}
      onFileSelect={onFileSelect}
      onTranslationChange={onTranslationChange}
      translationEntries={translations}
      isAddSubmitting={isAddSubmitting}
      onAddTranslation={onAddTranslation}
    />
  )
}

export const Default: Story = {
  render: RenderFunction
}
