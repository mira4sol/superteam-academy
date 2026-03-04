import {
  inferAdditionalFields,
  usernameClient,
} from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/react'
import { auth } from './auth'

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || '',
  plugins: [usernameClient(), inferAdditionalFields<typeof auth>()],
})

export const { signIn, signOut, signUp, useSession, getSession } = authClient
