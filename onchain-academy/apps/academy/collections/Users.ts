import { isAdmin, isAdminOrSelf } from '@/access/isAdmin'
import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'displayName',
  },
  access: {
    read: () => true,
    create: () => true,
    update: isAdminOrSelf,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'betterAuthId',
      type: 'text',
      unique: true,
      index: true,
      admin: { description: 'Better Auth user ID — links to auth system' },
    },
    {
      name: 'onboardingComplete',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Whether the user has completed onboarding' },
    },
    {
      name: 'walletAddress',
      type: 'text',
      unique: true,
      index: true,
      admin: { description: 'Solana wallet public key' },
    },
    {
      name: 'authMethod',
      type: 'select',
      options: [
        { label: 'Wallet', value: 'wallet' },
        { label: 'Google', value: 'google' },
        { label: 'GitHub', value: 'github' },
      ],
      defaultValue: 'wallet',
    },
    {
      name: 'githubUsername',
      type: 'text',
      admin: { description: 'Auto-saved from GitHub OAuth' },
    },
    {
      name: 'displayName',
      type: 'text',
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'bio',
      type: 'textarea',
      maxLength: 500,
    },
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Learner', value: 'learner' },
        { label: 'Instructor', value: 'instructor' },
        { label: 'Admin', value: 'admin' },
      ],
      defaultValue: 'learner',
      access: {
        update: ({ req: { user } }) => user?.role === 'admin',
      },
    },
    {
      name: 'socialLinks',
      type: 'group',
      fields: [
        { name: 'github', type: 'text' },
        { name: 'twitter', type: 'text' },
        { name: 'website', type: 'text' },
      ],
    },
    {
      name: 'locale',
      type: 'select',
      options: [
        { label: 'English', value: 'en' },
        { label: 'Português', value: 'pt-br' },
        { label: 'Español', value: 'es' },
      ],
      defaultValue: 'en',
    },
    {
      name: 'isPublicProfile',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}
