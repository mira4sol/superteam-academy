import { isAdmin, isAdminOrInstructor } from '@/access/isAdmin'
import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'alt',
  },
  access: {
    read: () => true,
    create: isAdminOrInstructor,
    update: isAdminOrInstructor,
    delete: isAdmin,
  },
  upload: {
    staticDir: 'public/media',
    mimeTypes: ['image/*', 'video/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      admin: { description: 'Alt text for accessibility' },
    },
    {
      name: 'caption',
      type: 'text',
    },
  ],
}
