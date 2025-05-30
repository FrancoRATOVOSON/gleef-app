import {
  LocaleTranslations,
  TranslationEntry,
  TranslationJson,
  TranslationTableData
} from '#/types/translations'
import { v4 as uuidv4 } from 'uuid'

export function flattenTranslationObject(
  obj: TranslationJson,
  prefix: string = '',
  level: number = 0,
  result: TranslationEntry[] = []
): TranslationEntry[] {
  for (const k in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, k)) {
      const fullKey = prefix ? `${prefix}.${k}` : k
      const value = obj[k]

      if (typeof value === 'object' && value !== null) {
        // C'est un objet imbriqué, c'est un "groupe"
        result.push({
          id: uuidv4(),
          key: fullKey,
          displayKey: k,
          level: level,
          isGroupHeader: true
        })
        flattenTranslationObject(value as TranslationJson, fullKey, level + 1, result)
      } else {
        // C'est une valeur de traduction
        result.push({
          id: uuidv4(),
          key: fullKey,
          displayKey: k,
          level: level + 1
          // Les locales seront ajoutées plus tard ou au moment de la fusion
        })
      }
    }
  }
  return result
}

// Fonction utilitaire pour fusionner les traductions de différentes locales
export function mergeTranslationsForTable(
  flattenedTemplate: TranslationEntry[],
  localeTranslations: LocaleTranslations
): TranslationTableData {
  // Use a Set to collect all unique keys from both sources
  const templateKeys = flattenedTemplate.length > 0 ? flattenedTemplate.map(entry => entry.key) : []

  // Create a map for quick lookup
  const templateMap = new Map(flattenedTemplate.map(entry => [entry.key, entry]))

  const finalTableData: TranslationTableData = []
  const finalTableMap = new Map<string, TranslationEntry>()

  for (const [locale, localeTranslation] of Object.entries(localeTranslations)) {
    const flattenedLocale = flattenTranslationObject(localeTranslation)

    const localeKeys = flattenedLocale.length > 0 ? flattenedLocale.map(entry => entry.key) : []
    const allKeys = Array.from(new Set([...templateKeys, ...localeKeys]))

    const localeMap = new Map(flattenedLocale.map(entry => [entry.key, entry]))

    for (const key of allKeys) {
      const templateEntry = templateMap.get(key)
      const localeEntry = localeMap.get(key)
      const baseEntry = templateEntry || localeEntry

      if (baseEntry) {
        const entry = { ...baseEntry }
        if (!entry.isGroupHeader) {
          const value = getNestedValue(localeTranslation, key)
          entry[locale] = value !== undefined ? String(value) : null
        }
        finalTableData.push(entry)
        finalTableMap.set(key, { ...finalTableMap.get(key), ...entry })
      }
    }
  }

  return Array.from(finalTableMap.values())
}

function getNestedValue(obj: { [key: string]: unknown }, path: string): string | undefined {
  const parts = path.split('.')
  let current = obj
  for (let i = 0; i < parts.length; i++) {
    if (
      typeof current !== 'object' ||
      current === null ||
      !Object.prototype.hasOwnProperty.call(current, parts[i])
    ) {
      return undefined
    }
    current = current[parts[i]] as { [key: string]: unknown }
  }
  return typeof current === 'string' ? current : undefined
}

// Fonction pour reconstituer le JSON à partir des données de la table
export function unflattenTranslationTableData(
  tableData: TranslationTableData,
  locales: string[]
): LocaleTranslations {
  const result: LocaleTranslations = {}

  locales.forEach(locale => {
    result[locale] = {}
  })

  tableData.forEach(entry => {
    if (!entry.isGroupHeader) {
      // Ignorer les en-têtes de groupe lors de la reconstitution
      locales.forEach(locale => {
        const value = entry[locale] || '' // Prendre la valeur ou une chaîne vide si null/undefined
        setNestedValue(result[locale], entry.key, value as string)
      })
    }
  })
  return result
}

// Helper pour définir une valeur imbriquée
function setNestedValue(obj: { [key: string]: unknown }, path: string, value: string) {
  const parts = path.split('.')
  let current = obj
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i]
    if (!current[part] || typeof current[part] !== 'object') {
      current[part] = {}
    }
    current = current[part] as { [key: string]: unknown }
  }
  current[parts[parts.length - 1]] = value
}
