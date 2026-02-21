'use client'

import { LANGUAGES } from '@/app/components/home/constants'
import type { LanguageOption } from '@/app/components/home/types'
import { Check, ChevronDown } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { useCallback, useEffect, useState } from 'react'
import { Link, usePathname } from '../../../i18n/navigation'

export function Nav() {
  const t = useTranslations('home')
  const locale = useLocale()
  const pathname = usePathname()
  const currentLang = LANGUAGES.find((l) => l.code === locale) as LanguageOption
  const [langOpen, setLangOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const closeLang = useCallback(() => setLangOpen(false), [])
  useEffect(() => {
    if (langOpen) {
      document.addEventListener('click', closeLang)
      return () => document.removeEventListener('click', closeLang)
    }
  }, [langOpen, closeLang])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = ''
      }
    }
  }, [mobileOpen])

  const closeMobile = useCallback(() => setMobileOpen(false), [])

  return (
    <nav className='fixed top-0 left-0 right-0 z-[999] flex items-center justify-between h-[68px] px-4 sm:px-[5%] border-b border-[rgba(0,140,76,0.3)] bg-[rgba(22,50,30,0.92)] backdrop-blur-[16px]'>
      <Link
        href='/'
        className='font-display text-lg sm:text-[22px] text-[var(--landing-cream)] tracking-tight shrink-0 no-underline'
      >
        Superteam <span className='text-[var(--landing-accent)]'>Academy</span>
      </Link>

      <ul className='hidden md:flex gap-6 lg:gap-9 list-none m-auto'>
        <li>
          <Link
            href='/#paths'
            className='text-[rgba(247,234,203,0.65)] no-underline text-sm font-medium transition-colors hover:text-[var(--landing-cream)] font-[inherit]'
          >
            {t('nav.courses')}
          </Link>
        </li>
        <li>
          <Link
            href='/#paths'
            className='text-[rgba(247,234,203,0.65)] no-underline text-sm font-medium transition-colors hover:text-[var(--landing-cream)] font-[inherit]'
          >
            {t('nav.paths')}
          </Link>
        </li>
        <li>
          <Link
            href='/#features'
            className='text-[rgba(247,234,203,0.65)] no-underline text-sm font-medium transition-colors hover:text-[var(--landing-cream)] font-[inherit]'
          >
            {t('nav.challenges')}
          </Link>
        </li>
      </ul>

      <div className='flex items-center gap-2 sm:gap-3 shrink-0'>
        <div className='relative'>
          <button
            type='button'
            onClick={(e) => {
              e.stopPropagation()
              setLangOpen((o) => !o)
            }}
            className={`flex items-center gap-[7px] rounded-lg py-1.5 px-2.5 border border-[rgba(247,234,203,0.14)] transition-colors font-[inherit] ${langOpen ? 'bg-[rgba(247,234,203,0.1)]' : 'bg-[rgba(247,234,203,0.06)] hover:bg-[rgba(247,234,203,0.1)]'}`}
          >
            <div className='flex items-center rounded-sm overflow-hidden shrink-0'>
              {currentLang.flag}
            </div>
            <span className='hidden sm:inline text-xs font-semibold text-[rgba(247,234,203,0.8)] tracking-wide'>
              {currentLang.short}
            </span>
            <ChevronDown
              size={10}
              className={`text-[rgba(247,234,203,0.5)] transition-transform shrink-0 ${langOpen ? 'rotate-180' : ''}`}
              strokeWidth={2}
            />
          </button>

          {langOpen && (
            <div
              className='absolute top-[calc(100%+8px)] right-0 min-w-[160px] z-[100] rounded-[10px] overflow-hidden border border-[rgba(0,140,76,0.25)] bg-[rgba(18,40,22,0.97)] backdrop-blur-[20px] shadow-[0_16px_40px_rgba(0,0,0,0.5)]'
              onClick={(e) => e.stopPropagation()}
            >
              {LANGUAGES.map((lang, i) => (
                <Link
                  key={lang.code}
                  href={pathname}
                  locale={lang.code}
                  className={`flex items-center gap-2.5 w-full py-2.5 px-3.5 text-left transition-colors border-b no-underline ${i < LANGUAGES.length - 1 ? 'border-[rgba(247,234,203,0.06)]' : 'border-none'} ${locale === lang.code ? 'bg-[rgba(0,140,76,0.15)]' : 'bg-transparent hover:bg-[rgba(247,234,203,0.05)]'} text-[inherit]`}
                >
                  <div className='rounded-sm overflow-hidden shrink-0'>
                    {lang.flag}
                  </div>
                  <span
                    className={`text-[13px] flex-1 font-[inherit] ${locale === lang.code ? 'font-semibold text-[var(--landing-cream)]' : 'font-normal text-[rgba(247,234,203,0.6)]'}`}
                  >
                    {lang.label}
                  </span>
                  {locale === lang.code && (
                    <Check
                      size={12}
                      className='text-[#52dda0] shrink-0'
                      strokeWidth={2.5}
                    />
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className='hidden sm:block w-px h-5 bg-[rgba(247,234,203,0.12)]' />

        <Link
          href='/login'
          className='landing-btn-outline-cream py-2 px-3 sm:py-[7px] sm:px-[18px] rounded-md text-xs sm:text-[13px] font-semibold cursor-pointer font-[inherit] no-underline inline-block'
        >
          {t('nav.login')}
        </Link>

        <button
          type='button'
          onClick={() => setMobileOpen((o) => !o)}
          className='md:hidden flex flex-col gap-1.5 w-10 h-10 items-center justify-center rounded-lg border border-[rgba(247,234,203,0.2)] text-[var(--landing-cream)]'
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          <span
            className={`w-5 h-0.5 bg-current rounded transition-transform ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`}
          />
          <span
            className={`w-5 h-0.5 bg-current rounded transition-opacity ${mobileOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`w-5 h-0.5 bg-current rounded transition-transform ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`}
          />
        </button>
      </div>

      {mobileOpen && (
        <div className='absolute top-full left-0 right-0 md:hidden bg-[rgba(18,40,22,0.98)] border-b border-[rgba(0,140,76,0.25)] backdrop-blur-xl shadow-lg'>
          <ul className='flex flex-col py-4 px-4 list-none gap-0'>
            <li>
              <Link
                href='/#paths'
                onClick={closeMobile}
                className='block py-3 text-[rgba(247,234,203,0.85)] no-underline text-base font-medium hover:text-[var(--landing-cream)] font-[inherit]'
              >
                {t('nav.courses')}
              </Link>
            </li>
            <li>
              <Link
                href='/#paths'
                onClick={closeMobile}
                className='block py-3 text-[rgba(247,234,203,0.85)] no-underline text-base font-medium hover:text-[var(--landing-cream)] font-[inherit]'
              >
                {t('nav.paths')}
              </Link>
            </li>
            <li>
              <Link
                href='/#features'
                onClick={closeMobile}
                className='block py-3 text-[rgba(247,234,203,0.85)] no-underline text-base font-medium hover:text-[var(--landing-cream)] font-[inherit]'
              >
                {t('nav.challenges')}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}
