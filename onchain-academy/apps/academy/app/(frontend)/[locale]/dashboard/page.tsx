import { auth } from '@/libs/auth'
import { getPayloadClient } from '@/libs/payload'
import { setRequestLocale } from 'next-intl/server'
import dynamic from 'next/dynamic'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

const Dashboard = dynamic(
  () => import('./Dashboard').then((m) => ({ default: m.default })),
  { ssr: true },
)

type Props = {
  params: Promise<{ locale: string }>
}

export default async function DashboardPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user?.id) {
    redirect(`/${locale}/login`)
  }

  const payload = await getPayloadClient()
  const payloadUsers = await payload.find({
    collection: 'users',
    where: {
      betterAuthId: {
        equals: session.user.id,
      },
    },
    limit: 1,
  })

  const dbUser = payloadUsers.docs[0]
  if (!dbUser) {
    redirect(`/${locale}/profile/set-up`)
  }

  const streaksResult = await payload.find({
    collection: 'streaks',
    where: {
      user: {
        equals: dbUser.id,
      },
    },
    limit: 1,
  })

  const dbStreak = streaksResult.docs[0] || null

  return <Dashboard dbUser={dbUser} dbStreak={dbStreak} />
}
