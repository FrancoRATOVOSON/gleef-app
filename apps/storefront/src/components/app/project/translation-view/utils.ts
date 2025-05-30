import { LocaleTranslations, TranslationTableData } from '#/types/translations'

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
