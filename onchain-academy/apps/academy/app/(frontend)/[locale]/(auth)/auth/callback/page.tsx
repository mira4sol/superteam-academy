'use client'

import { Loader2 } from 'lucide-react'

/**
 * OAuth callback page — shows a loading state while Better Auth
 * processes the callback and redirects to the login page with
 * the callback query param for onboarding detection.
 *
 * Better Auth handles the actual OAuth callback processing
 * via its /api/auth/* routes. This page is primarily a
 * visual placeholder during the redirect.
 */
export default function AuthCallbackPage() {
  return (
    <div
      className='min-h-screen w-full flex items-center justify-center'
      style={{ background: 'hsl(var(--green-hero))' }}
    >
      <div className='text-center'>
        <Loader2
          size={32}
          className='animate-spin mx-auto mb-4'
          style={{ color: 'hsl(var(--green-primary))' }}
        />
        <p className='font-ui text-[0.85rem] text-cream/60'>
          Completing sign in...
        </p>
      </div>
    </div>
  )
}
