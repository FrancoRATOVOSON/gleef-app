import { fetchGET, fetchPOST, fetchPUT, uploadFiles as fetchUpload } from '#/lib/utils'
import { TranslationEntry } from '#/types/translations'

export const getLocales = (id: string) => fetchGET<string[]>(`/project/${id}/locales`)

export const getTranslations = (projectId: string) =>
  fetchGET<TranslationEntry[]>(`/project/${projectId}/translations`)

export const updateTranslation = (payload: { id: string; locale: string; value: string }) =>
  fetchPUT<void, { id: string; locale: string; value: string }>('/translation', payload)

export const addTranslation = (payload: {
  projectId: string
  fullKey: string
  values: { [locales: string]: string | null }
}) =>
  fetchPOST<
    void,
    { projectId: string; fullKey: string; values: { [locales: string]: string | null } }
  >('/translation', payload)

export const uploadFiles = (payload: { projectId: string; files: File[] }) =>
  fetchUpload<void>('/translations', payload)
