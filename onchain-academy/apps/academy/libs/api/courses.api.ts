import { fetchAPI } from './index'

export const coursesAPI = {
  find: (params?: string) =>
    fetchAPI<{ docs: unknown[] }>(`/courses${params ? `?${params}` : ''}`),

  findBySlug: (slug: string) =>
    fetchAPI<{ docs: unknown[] }>(
      `/courses?where[slug][equals]=${slug}&limit=1`,
    ),

  findById: (id: string) => fetchAPI<unknown>(`/courses/${id}`),
}
