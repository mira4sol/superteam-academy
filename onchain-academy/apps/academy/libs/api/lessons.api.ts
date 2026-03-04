import { fetchAPI } from './index'

export const lessonsAPI = {
  findByModule: (moduleId: string) =>
    fetchAPI<{ docs: unknown[] }>(
      `/lessons?where[module][equals]=${moduleId}&sort=sortOrder`,
    ),

  findById: (id: string) => fetchAPI<unknown>(`/lessons/${id}`),

  getContent: (lessonId: string) =>
    fetchAPI<{ docs: unknown[] }>(
      `/lesson-contents?where[lesson][equals]=${lessonId}&limit=1`,
    ),
}
