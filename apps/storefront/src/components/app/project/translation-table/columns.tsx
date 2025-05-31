/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import { ColumnDef } from '@tanstack/react-table'
import { TranslationEntry, TranslationTableData } from '#/types/translations'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { ArrowUpDown } from 'lucide-react'
import { cn } from '#/lib/utils'
import React from 'react'
import { AddTokenDialog } from '../add-token'
import { Popover, PopoverContent, PopoverTrigger } from '#/components/ui/popover'
import { unflattenTranslationTableData } from './utils'
import { toast } from 'sonner'

interface CreateTranslationColumnsOptions {
  availableLocales: string[]
  onTranslationChange: (id: string, locale: string, value: string) => void
  onAddTranslation: (fullKey: string, values: { [locales: string]: string | null }) => void
  isAddSubmitting: boolean
  data: TranslationTableData
}

export const createTranslationColumns = ({
  availableLocales,
  onTranslationChange,
  onAddTranslation,
  isAddSubmitting,
  data
}: CreateTranslationColumnsOptions): ColumnDef<TranslationEntry>[] => {
  const columns: ColumnDef<TranslationEntry>[] = [
    {
      accessorKey: 'key',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="flex items-center"
          >
            Keys
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const isGroupHeader = row.original.isGroupHeader
        const level = row.original.level
        const displayKey = row.original.displayKey

        const indentation = { paddingLeft: `${(level + 1) * 16}px` }

        return (
          <div style={indentation} className="flex items-center gap-2 font-mono">
            {isGroupHeader ? (
              <AddTokenDialog
                fullKey={row.original.key}
                locales={availableLocales}
                onSubmit={onAddTranslation}
                isSubmitting={isAddSubmitting}
              />
            ) : (
              <span className="mr-2 inline-block h-6 w-6"></span>
            )}
            <span className={isGroupHeader ? 'font-bold text-gray-700' : 'text-gray-900'}>
              {displayKey}
            </span>
          </div>
        )
      },
      enableSorting: true,
      enableColumnFilter: true, // Permettre le filtrage global sur les clés
      meta: {
        filterVariant: 'fuzzy' // Exemple pour une recherche floue
      }
    }
  ]

  // Ajout des colonnes dynamiques pour chaque locale
  availableLocales.forEach(locale => {
    columns.push({
      accessorKey: locale,
      header: () => {
        const handleExportToFile = () => {
          const jsonTranslation = unflattenTranslationTableData(data, locale)
          try {
            const textContent = JSON.stringify(jsonTranslation)
            const blob = new Blob([textContent], { type: 'application/json' })
            const url = URL.createObjectURL(blob)

            const a = document.createElement('a')
            a.href = url
            a.download = locale
            a.click()
            document.body.removeChild(a)
            URL.revokeObjectURL(url)
          } catch (error: unknown) {
            console.error('File exoprt error :', error)
            toast('An error occured while generating file.')
          }
        }

        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button className="cursor-pointer" variant="ghost">
                {locale}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-fit">
              <Button variant="secondary" onClick={handleExportToFile}>
                Export To
              </Button>
            </PopoverContent>
          </Popover>
        )
      },
      cell: ({ row }) => {
        const [isEditable, setEditable] = React.useState(false)
        const inputRef = React.useRef<HTMLInputElement>(null)
        const isGroupHeader = row.original.isGroupHeader
        const value = row.original[locale] as string

        if (isGroupHeader) {
          return null
        }

        return (
          <Input
            ref={inputRef}
            type="text"
            defaultValue={value || ''}
            onBlur={e => {
              if (e.target.value.trim() && e.target.value !== value) {
                onTranslationChange(row.original.id, locale, inputRef.current?.value.trim() || '')
              }
              setEditable(false)
            }}
            onClick={() => setEditable(true)}
            className={cn('h-8 w-full', !isEditable && 'cursor-pointer border-none shadow-none')}
            placeholder="Translate..."
          />
        )
      },
      enableSorting: false,
      enableColumnFilter: false
    })
  })

  return columns
}
