/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import { ColumnDef } from '@tanstack/react-table'
import { TranslationEntry } from '#/types/translations'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { ArrowUpDown } from 'lucide-react'
import { cn } from '#/lib/utils'
import React from 'react'
import { AddTokenDialog } from '../add-token'

interface CreateTranslationColumnsOptions {
  availableLocales: string[]
  onTranslationChange: (id: string, locale: string, value: string) => void
  onAddTranslation: (fullKey: string, values: { [locales: string]: string | null }) => Promise<void>
  isAddSubmitting: boolean
}

export const createTranslationColumns = ({
  availableLocales,
  onTranslationChange,
  onAddTranslation,
  isAddSubmitting
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
                fullKey={displayKey}
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
      header: locale,
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
