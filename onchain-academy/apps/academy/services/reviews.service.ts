import { getPayloadClient } from '@/libs/payload'

export async function getApprovedReviewsByCourse(courseId: string, limit = 20) {
  const payload = await getPayloadClient()
  return payload.find({
    collection: 'reviews',
    where: {
      and: [
        { course: { equals: courseId } },
        { status: { equals: 'approved' } },
      ],
    },
    sort: '-createdAt',
    limit,
    depth: 1,
  })
}

export async function createReview(data: {
  course: string
  user: string
  rating: number
  text: string
}) {
  const payload = await getPayloadClient()
  return payload.create({
    collection: 'reviews',
    data: { ...data, status: 'pending' },
  })
}
