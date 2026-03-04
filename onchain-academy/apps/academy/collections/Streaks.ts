import { isAdmin } from '@/access/isAdmin'
import type { CollectionConfig } from 'payload'

export const Streaks: CollectionConfig = {
  slug: 'streaks',
  admin: {
    useAsTitle: 'user',
  },
  access: {
    read: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === 'admin') return true
      return { user: { equals: user.id } }
    },
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === 'admin') return true
      return { user: { equals: user.id } }
    },
    delete: isAdmin,
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'currentStreak',
      type: 'number',
      defaultValue: 0,
      min: 0,
    },
    {
      name: 'longestStreak',
      type: 'number',
      defaultValue: 0,
      min: 0,
    },
    {
      name: 'lastActivityDate',
      type: 'date',
    },
    {
      name: 'history',
      type: 'json',
      admin: {
        description:
          'Array of { date: string, active: boolean } for calendar visualization',
      },
    },
  ],
}
