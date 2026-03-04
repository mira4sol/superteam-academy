import { getPayloadClient } from '@/libs/payload'

export async function getUserByWallet(walletAddress: string) {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'users',
    where: { walletAddress: { equals: walletAddress } },
    limit: 1,
  })
  return docs[0] ?? null
}

export async function getUserByEmail(email: string) {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'users',
    where: { email: { equals: email } },
    limit: 1,
  })
  return docs[0] ?? null
}

export async function getUserById(id: string) {
  const payload = await getPayloadClient()
  return payload.findByID({ collection: 'users', id })
}

export async function createUser(data: {
  email?: string
  walletAddress?: string
  authMethod: 'wallet' | 'google' | 'github'
  displayName?: string
  githubUsername?: string
  password?: string
}) {
  const payload = await getPayloadClient()
  return payload.create({ collection: 'users', data })
}

export async function updateUser(id: string, data: Record<string, unknown>) {
  const payload = await getPayloadClient()
  return payload.update({ collection: 'users', id, data })
}
