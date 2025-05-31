import { fetchGET } from '#/lib/utils'
import { TranslationEntry } from '#/types/translations'

export const getTranslations = () => fetchGET<TranslationEntry[]>('/translations')
