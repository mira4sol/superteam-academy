import dynamic from 'next/dynamic'

const LandingA = dynamic(
  () => import('./components/home').then((m) => ({ default: m.LandingA })),
  { ssr: true },
)

export default function Home() {
  return <LandingA />
}
