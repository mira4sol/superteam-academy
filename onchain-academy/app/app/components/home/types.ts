import type { ReactNode } from 'react'

export type LangCode = 'en' | 'es' | 'pt'

export interface LanguageOption {
  code: LangCode
  label: string
  short: string
  flag: ReactNode
}

export interface PathModuleItem {
  label: string
  done?: boolean
  active?: boolean
}

export interface PathItem {
  svgKey: 'foundations' | 'programs' | 'defi'
  tag: string
  tagColor: string
  tagText: string
  level: number
  title: string
  desc: string
  modules: PathModuleItem[]
  progress: number
  xp: string
  duration: string
  lessons: number
  featured: boolean
}

export interface FeatureItem {
  key: string
  num: string
  title: string
  desc: string
  meta: string
  accent?: boolean
}

export interface TestimonialItem {
  name: string
  role: string
  initials: string
  avatarBg: string
  stars: number
  quote: string
  highlight: boolean
}

export interface PartnerItem {
  name: string
  abbr: string
}

export interface StatItem {
  value: string
  label: string
}
