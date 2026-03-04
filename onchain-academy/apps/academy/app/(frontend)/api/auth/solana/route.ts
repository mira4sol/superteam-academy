import { auth } from '@/libs/auth'
import bs58 from 'bs58'
import { NextRequest, NextResponse } from 'next/server'
import nacl from 'tweetnacl'

/**
 * Custom Solana wallet authentication endpoint.
 *
 * Flow:
 * 1. Client connects wallet via Solana Wallet Adapter
 * 2. Client signs a nonce message with the wallet
 * 3. Client POSTs { publicKey, signature, message } here
 * 4. We verify the signature via tweetnacl
 * 5. Find or create user in Better Auth
 * 6. Create session via Better Auth's cookie handler
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { publicKey, signature, message } = body

    if (!publicKey || !signature || !message) {
      return NextResponse.json(
        { error: 'Missing publicKey, signature, or message' },
        { status: 400 },
      )
    }

    // 1. Verify the ed25519 signature
    const messageBytes = new TextEncoder().encode(message)
    const signatureBytes = bs58.decode(signature)
    const pubKeyBytes = bs58.decode(publicKey)

    const isValid = nacl.sign.detached.verify(
      messageBytes,
      signatureBytes,
      pubKeyBytes,
    )

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    // 2. Find or create user via internal adapter
    const walletEmail = `${publicKey}@wallet.superteam.local`
    const ctx = await auth.$context

    let existingRecord = await ctx.internalAdapter
      .findUserByEmail(walletEmail)
      .catch(() => null)

    if (!existingRecord?.user) {
      // Create a new user
      const newUser = await ctx.internalAdapter.createUser({
        email: walletEmail,
        emailVerified: true,
        name: `${publicKey.slice(0, 4)}...${publicKey.slice(-4)}`,
        walletAddress: publicKey,
        role: 'learner',
        onboardingComplete: false,
      })

      // Also create an account record (required for Better Auth sessions)
      await ctx.internalAdapter.createAccount({
        userId: newUser.id,
        accountId: newUser.id,
        providerId: 'credential',
        password: '',
      })

      existingRecord = { user: newUser, accounts: [] }
    }

    // 3. Create session via internal adapter
    const session = await ctx.internalAdapter.createSession(
      existingRecord.user.id,
    )

    if (!session) {
      return NextResponse.json(
        { error: 'Failed to create session' },
        { status: 500 },
      )
    }

    // 4. Build response with proper session cookie
    const response = NextResponse.json({
      success: true,
      user: {
        id: existingRecord.user.id,
        name: existingRecord.user.name,
        email: existingRecord.user.email,
      },
      session: { id: session.id },
    })

    // Set the session token cookie in the format Better Auth expects
    response.cookies.set('better-auth.session_token', session.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  } catch (error) {
    console.error('[solana-auth] Error:', error)
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 },
    )
  }
}
