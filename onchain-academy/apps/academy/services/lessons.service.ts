import { getPayloadClient } from '@/libs/payload'

export async function getLessonsByModule(moduleId: string) {
  const payload = await getPayloadClient()
  return payload.find({
    collection: 'lessons',
    where: { module: { equals: moduleId } },
    sort: 'sortOrder',
    limit: 100,
  })
}

export async function getLessonById(id: string) {
  const payload = await getPayloadClient()
  return payload.findByID({ collection: 'lessons', id, depth: 1 })
}

export async function createLesson(data: Record<string, unknown>) {
  const payload = await getPayloadClient()
  return payload.create({ collection: 'lessons', data })
}

export async function updateLesson(id: string, data: Record<string, unknown>) {
  const payload = await getPayloadClient()
  return payload.update({ collection: 'lessons', id, data })
}
