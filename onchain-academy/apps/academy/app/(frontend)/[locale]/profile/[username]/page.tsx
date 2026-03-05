import { getPayloadClient } from '@/libs/payload'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'

import dynamic from 'next/dynamic'

const Profile = dynamic(
  () => import('./Profile').then((m) => ({ default: m.Profile })),

  { ssr: true },
)

type Props = {
  params: Promise<{ locale: string; username: string }>
}

export default async function ProfilePage({ params }: Props) {
  const { locale, username } = await params

  setRequestLocale(locale)

  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'users',
    where: {
      username: {
        equals: username,
      },
    },
    depth: 1,
  })

  const dbUser = result.docs[0]
  if (!dbUser) {
    notFound()
  }

  return <Profile username={username} dbUser={dbUser} />
}
