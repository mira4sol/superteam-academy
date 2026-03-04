import { auth } from '@/libs/auth'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Update the authenticated user's profile.
 * Called from the onboarding form to set displayName, username, socials, etc.
 */
export async function POST(req: NextRequest) {
  try {
    // Read the session token directly from cookies
    const cookieStore = await cookies()
    const sessionToken = cookieStore.get('better-auth.session_token')?.value

    if (!sessionToken) {
      console.error('[update-profile] No session cookie found')
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    // Verify session via internal adapter
    const ctx = await auth.$context
    const session = await ctx.internalAdapter.findSession(sessionToken)

    if (!session?.session || !session?.user) {
      console.error('[update-profile] Session token invalid')
      return NextResponse.json({ error: 'Invalid session' }, { status: 401 })
    }

    const body = await req.json()
    const {
      name,
      username,
      bio,
      twitter,
      github,
      linkedin,
      telegram,
      walletAddress,
      onboardingComplete,
    } = body

    // Update user via Better Auth internal adapter
    await ctx.internalAdapter.updateUser(session.user.id, {
      name: name || session.user.name,
      ...(username && { username }),
      ...(bio !== undefined && { bio }),
      ...(twitter !== undefined && { twitter }),
      ...(github !== undefined && { github }),
      ...(linkedin !== undefined && { linkedin }),
      ...(telegram !== undefined && { telegram }),
      ...(walletAddress && { walletAddress }),
      ...(onboardingComplete !== undefined && { onboardingComplete }),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[update-profile] Error:', error)
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 },
    )
  }
}
