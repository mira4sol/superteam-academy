import { getPayloadClient } from '@/libs/payload'

export async function getContentByLesson(lessonId: string) {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'lesson-contents',
    where: { lesson: { equals: lessonId } },
    limit: 1,
    depth: 0,
  })
  return docs[0] ?? null
}

export async function createLessonContent(data: Record<string, unknown>) {
  const payload = await getPayloadClient()
  return payload.create({ collection: 'lesson-contents', data })
}

export async function updateLessonContent(
  id: string,
  data: Record<string, unknown>,
) {
  const payload = await getPayloadClient()
  return payload.update({ collection: 'lesson-contents', id, data })
}
