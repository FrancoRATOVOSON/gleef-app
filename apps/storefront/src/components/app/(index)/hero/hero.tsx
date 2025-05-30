import { Typewriter } from '#/components/ui/typewriter'
import { Button } from '#/components/ui/button'
import Link from 'next/link'

export function Hero() {
  return (
    <div className="bg-background flex h-full w-full flex-col items-start justify-evenly gap-6 overflow-hidden p-16 pt-48">
      <div className="whitespace-pre-wrap text-2xl font-normal sm:text-3xl md:text-4xl lg:text-5xl">
        <span>{'Make your app more '}</span>
        <Typewriter
          text={[
            'global',
            'accessible',
            'inclusive',
            'multilingual',
            'user-friendly',
            'international',
            'localized',
            'efficient',
            'collaborative',
            'translation-ready'
          ]}
          speed={70}
          className="text-yellow-500"
          waitTime={1500}
          deleteSpeed={40}
          cursorChar={'_'}
        />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-start gap-2">
          <span className="mr-0">Look! Who&apos;s back,</span>
          <Button
            asChild
            variant="link"
            size="sm"
            className="m-0 space-x-0 space-y-0 p-0 pb-0.5 text-lg hover:text-yellow-600"
          >
            <Link href="/login">Log in</Link>
          </Button>
        </div>
        <div className="flex flex-row items-center justify-start gap-2">
          <span className="mr-2">New to the experience?</span>
          <Button
            asChild
            variant="default"
            size="sm"
            className="rounded-xl bg-yellow-500 px-8 py-6 text-lg text-white shadow-lg hover:bg-yellow-600"
          >
            <Link href="/signup">Sign up</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
