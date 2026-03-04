import type {
  PayloadLesson,
  PayloadLessonContent,
  PayloadResponse,
} from '@/libs/types/course.types'
import { fetchAPI } from './index'

export const lessonsAPI = {
  findByModule: (moduleId: string) =>
    fetchAPI<PayloadResponse<PayloadLesson>>(
      `/lessons?where[module][equals]=${moduleId}&sort=sortOrder&limit=100`,
    ),

  findById: (id: string) => fetchAPI<PayloadLesson>(`/lessons/${id}?depth=1`),

  getContent: (lessonId: string) =>
    fetchAPI<PayloadResponse<PayloadLessonContent>>(
      `/lesson-contents?where[lesson][equals]=${lessonId}&limit=1`,
    ),
}
