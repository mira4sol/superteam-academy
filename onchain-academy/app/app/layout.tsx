import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
  preload: false,
})

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['700', '900'],
  display: 'swap',
  preload: true,
})

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
  preload: true,
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://academy.superteam.fun'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Superteam Academy | Learn Solana & Web3',
  description: 'Decentralized learning on Solana. Enroll in courses, earn soulbound XP, collect credentials, and join the builder community.',
  openGraph: {
    title: 'Superteam Academy | Learn Solana & Web3',
    description: 'Decentralized learning on Solana. Enroll in courses, earn soulbound XP, collect credentials, and join the builder community.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Superteam Academy | Learn Solana & Web3',
    description: 'Decentralized learning on Solana. Enroll in courses, earn soulbound XP, collect credentials, and join the builder community.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0d1f12',
}

export default function RootLayout ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${dmSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
