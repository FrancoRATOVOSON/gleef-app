import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { useCallback, useRef } from 'react'

export interface AddTokenProps {
  fullKey: string
  locales: Array<string>
  onSubmit: (fullKey: string, values: { [locales: string]: string | null }) => Promise<void>
  isSubmitting: boolean
}

export function AddToken({ fullKey, locales, onSubmit }: AddTokenProps) {
  const keyInputRef = useRef<HTMLInputElement>(null)
  const valuesInputRefs = useRef<Map<string, HTMLInputElement | null>>(
    new Map(locales.map(locale => [locale, null]))
  )

  const handleSubmit = useCallback(() => {
    if (keyInputRef.current?.value) {
      const localeValues: { [locales: string]: string | null } = {}

      valuesInputRefs.current.entries().forEach(([locale, ref]) => {
        localeValues[locale] = ref?.value ?? null
      })

      onSubmit(`${fullKey}.${keyInputRef.current.value}`, localeValues)
    }
  }, [fullKey, onSubmit])

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{fullKey}</h3>

      <div className="flex items-center justify-between gap-2">
        <div className="w-full space-y-1">
          <div className="text-muted-foreground gap-2 text-center text-sm font-medium">Key</div>
          <Input type="text" ref={keyInputRef} />
        </div>
        {locales.map(locale => (
          <div key={locale} className="w-full space-y-1">
            <div className="text-muted-foreground gap-2 text-center text-sm font-medium">
              {locale}
            </div>
            <Input
              type="text"
              ref={node => {
                if (valuesInputRefs.current.has(locale)) {
                  valuesInputRefs.current.delete(locale)
                }
                if (node) {
                  valuesInputRefs.current.set(locale, node)
                }
              }}
            />
          </div>
        ))}
      </div>

      <Button onClick={handleSubmit} className="cursor-pointer">
        Add Token
      </Button>
    </div>
  )
}
