'use client'

import * as React from 'react'
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getExpandedRowModel, // Pour l'expansion des lignes
  useReactTable
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '#/components/ui/table'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '#/components/ui/dropdown-menu'
import { TranslationTableData } from '#/types/translations'
import { createTranslationColumns } from './columns'

interface TranslationDataTableProps {
  data: TranslationTableData
  availableLocales: string[]
  onTranslationChange: (id: string, locale: string, value: string) => void
  onAddTranslation: (fullKey: string, values: { [locales: string]: string | null }) => Promise<void>
  isAddSubmitting: boolean
}

export function TranslationTable({
  data,
  availableLocales,
  onTranslationChange,
  isAddSubmitting,
  onAddTranslation
}: TranslationDataTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [expanded, setExpanded] = React.useState({}) // État pour l'expansion des lignes

  const columns = React.useMemo(
    () =>
      createTranslationColumns({
        availableLocales,
        onTranslationChange,
        onAddTranslation,
        isAddSubmitting,
        data
      }),
    [availableLocales, isAddSubmitting, onAddTranslation, onTranslationChange, data]
  )

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(), // IMPORTANT pour l'expansion
    onExpandedChange: setExpanded, // Gérer l'état d'expansion
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      expanded
    }
    // getSubRows: () => {
    //   return undefined
    // }
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        {/* Filtre global sur la colonne 'Keys' */}
        <Input
          placeholder="Filter keys..."
          value={(table.getColumn('key')?.getFilterValue() as string) ?? ''}
          onChange={event => table.getColumn('key')?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        {/* Menu de visibilité des colonnes */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter(column => column.getCanHide())
              .map(column => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={value => column.toggleVisibility(!!value)}
                  >
                    {String(column.id)}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => {
                return (
                  <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                    {row.getVisibleCells().map(cell => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                )
              })
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
