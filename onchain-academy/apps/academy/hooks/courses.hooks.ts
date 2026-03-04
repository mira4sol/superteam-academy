import type { CollectionBeforeChangeHook } from 'payload'

export const slugify: CollectionBeforeChangeHook = ({ data, operation }) => {
  if (operation === 'create' && data && !data.slug && data.title) {
    data.slug = data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }
  return data
}
