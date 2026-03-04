import { create } from 'zustand'

export type AuthUser = {
  id: string
  email: string
  name: string
  image?: string | null
  walletAddress?: string | null
  role?: string
  onboardingComplete?: boolean
  username?: string | null
  bio?: string | null
  twitter?: string | null
  github?: string | null
  linkedin?: string | null
  telegram?: string | null
}

type AuthState = {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
  needsOnboarding: boolean

  // Derived
  isAdmin: boolean
  isInstructor: boolean

  // Actions
  setUser: (user: AuthUser | null) => void
  setLoading: (loading: boolean) => void
  clear: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  needsOnboarding: false,
  isAdmin: false,
  isInstructor: false,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
      isLoading: false,
      needsOnboarding: user ? !user.onboardingComplete : false,
      isAdmin: user?.role === 'admin',
      isInstructor: user?.role === 'instructor',
    }),

  setLoading: (isLoading) => set({ isLoading }),

  clear: () =>
    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      needsOnboarding: false,
      isAdmin: false,
      isInstructor: false,
    }),
}))
