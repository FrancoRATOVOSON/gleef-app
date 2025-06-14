import { queryClient } from '#/lib/client'
import { queryKeys } from '#/lib/constants'
import { getProject } from '#/services/projects'
import {
  addTranslation,
  getLocales,
  getTranslations,
  updateTranslation,
  uploadFiles
} from '#/services/translation'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'

export function useGetLocales(projectId: string) {
  const { data } = useQuery({
    queryKey: [queryKeys.getLocales],
    queryFn: () => getLocales(projectId)
  })

  return data ?? []
}

export function useGetTranslations(projectId: string) {
  const { data } = useQuery({
    queryKey: [queryKeys.getTranslations],
    queryFn: () => getTranslations(projectId)
  })

  return data ?? []
}

export function useChangeTranslation() {
  const { mutate } = useMutation({
    mutationFn: updateTranslation
  })

  const onTranslationChange = useCallback(
    (id: string, locale: string, value: string) => mutate({ id, locale, value }),
    [mutate]
  )

  return { onTranslationChange }
}

export function useAddTranslation() {
  const { mutate, isPending } = useMutation({
    mutationFn: addTranslation
  })

  const onAddTranslation = useCallback(
    (projectId: string, fullKey: string, values: { [locales: string]: string | null }) =>
      mutate({ projectId, fullKey, values }),
    [mutate]
  )

  return { onAddTranslation, isAddSubmitting: isPending }
}

export function useFileUpload() {
  const client = useQueryClient(queryClient)
  const { mutate, isPending } = useMutation({
    mutationFn: uploadFiles,
    onSuccess: () =>
      client.invalidateQueries({ queryKey: [queryKeys.getLocales, queryKeys.getTranslations] })
  })

  return { onFileSelect: mutate, isFileUploadLoading: isPending }
}

export function useGetProject(id: string) {
  const { data } = useQuery({
    queryKey: [queryKeys.getProject],
    queryFn: () => getProject(id)
  })

  return data
}
