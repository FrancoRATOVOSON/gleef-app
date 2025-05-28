/**
 * Représente une seule entrée de traduction pour la table.
 */
export type TranslationEntry = {
  id: string
  key: string
  displayKey: string
  level: number
  isGroupHeader?: boolean
  [locale: string]: string | number | boolean | null | undefined
}

export type TranslationTableData = TranslationEntry[]

export type TranslationJson = {
  [key: string]: string | TranslationJson
}

export type LocaleTranslations = {
  [locale: string]: TranslationJson
}
