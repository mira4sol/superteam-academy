'use client'

import { useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { Nav } from './Nav'
import { Hero } from './Hero'
import './landing-a.css'

const SocialProofBar = dynamic(() => import('./SocialProofBar').then((m) => ({ default: m.SocialProofBar })), { ssr: true })
const LearningPaths = dynamic(() => import('./LearningPaths').then((m) => ({ default: m.LearningPaths })), { ssr: true })
const Features = dynamic(() => import('./Features').then((m) => ({ default: m.Features })), { ssr: true })
const Testimonials = dynamic(() => import('./Testimonials').then((m) => ({ default: m.Testimonials })), { ssr: true })
const CtaBanner = dynamic(() => import('./CtaBanner').then((m) => ({ default: m.CtaBanner })), { ssr: true })
const Footer = dynamic(() => import('./Footer').then((m) => ({ default: m.Footer })), { ssr: true })

export function LandingA () {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleEmailChange = useCallback((value: string) => {
    setEmail(value)
  }, [])

  const handleSubscribe = useCallback(() => {
    if (email) setSubscribed(true)
  }, [email])

  return (
    <div className="min-h-screen bg-[var(--landing-cream)] text-[var(--landing-charcoal)] overflow-x-hidden font-[var(--font-dm-sans),sans-serif] text-base">
      <Nav />
      <Hero />
      <SocialProofBar />
      <LearningPaths />
      <div className="landing-section-divider max-w-[1200px] mx-auto px-4 sm:px-0" />
      <Features />
      <Testimonials />
      <CtaBanner />
      <Footer
        email={email}
        subscribed={subscribed}
        onEmailChange={handleEmailChange}
        onSubscribe={handleSubscribe}
      />
    </div>
  )
}
