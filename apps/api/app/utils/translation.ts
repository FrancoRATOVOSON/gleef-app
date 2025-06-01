export type TranslationJson = {
  [key: string]: string | TranslationJson
}

export type TranslationEntry = {
  [locale: string]: string | boolean | null | undefined
  key: string
  isGroupHeader: boolean
}

export function flattenTranslationObject(
  obj: TranslationJson,
  locale: string,
  prefix: string = '',
  result: TranslationEntry[] = []
): TranslationEntry[] {
  for (const k in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, k)) {
      const fullKey = prefix ? `${prefix}.${k}` : k
      const value = obj[k]

      if (typeof value === 'object' && value !== null) {
        // C'est un objet imbriqué, c'est un "groupe"
        result.push({
          key: fullKey,
          isGroupHeader: true,
        })
        flattenTranslationObject(value as TranslationJson, locale, fullKey, result)
      } else {
        // C'est une valeur de traduction
        result.push({
          key: fullKey,
          isGroupHeader: false,
          [locale]: value,
        })
      }
    }
  }
  return result
}
