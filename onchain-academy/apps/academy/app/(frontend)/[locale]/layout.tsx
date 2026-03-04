import { Toaster as Sonner } from '@/components/ui/sonner'
import { Toaster } from '@/components/ui/toaster'
import { AuthProvider } from '@/contexts/AuthProvider'
import { SolanaProvider } from '@/contexts/SolanaProvider'
import { routing } from '@/i18n/routing'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import '../globals.css'

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
  setRequestLocale(locale)

  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      <SolanaProvider>
        <AuthProvider>{children}</AuthProvider>
      </SolanaProvider>
      <Toaster />
      <Sonner />
    </NextIntlClientProvider>
  )
}
