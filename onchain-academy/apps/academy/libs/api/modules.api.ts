import type {
  PayloadLesson,
  PayloadModule,
  PayloadResponse,
} from '@/libs/types/course.types'
import { fetchAPI } from './index'

export const modulesAPI = {
  findByCourse: (courseId: string) =>
    fetchAPI<PayloadResponse<PayloadModule>>(
      `/modules?where[course][equals]=${courseId}&sort=sortOrder&limit=100`,
    ),

  findById: (id: string) => fetchAPI<PayloadModule>(`/modules/${id}`),

  findLessonsByModule: (moduleId: string) =>
    fetchAPI<PayloadResponse<PayloadLesson>>(
      `/lessons?where[module][equals]=${moduleId}&sort=sortOrder&limit=100`,
    ),
}
