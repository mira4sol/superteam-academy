'use client'

import { useSession } from '@/libs/auth-client'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

/**
 * Profile set-up page — redirects to the login page's onboarding
 * flow if the user hasn't completed setup, or to dashboard if done.
 *
 * The actual onboarding UI lives in Login.tsx's OnboardingStep.
 * This page acts as a guard/redirect.
 */
export default function ProfileSetUpPage() {
  const { data: session, isPending } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (isPending) return

    if (!session?.user) {
      router.replace('/en/login')
      return
    }

    const user = session.user as Record<string, unknown>
    if (user.onboardingComplete) {
      router.replace('/en/dashboard')
    } else {
      // Redirect to login which will show the onboarding step
      router.replace('/en/login')
    }
  }, [session, isPending, router])

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
          Loading your profile...
        </p>
      </div>
    </div>
  )
}
