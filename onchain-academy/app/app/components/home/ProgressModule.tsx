'use client'

import type { PathModuleItem } from '@/app/components/home/types'
import { Check } from 'lucide-react'

interface ProgressModuleProps extends PathModuleItem {}

export function ProgressModule({ label, done, active }: ProgressModuleProps) {
  return (
    <div className='flex items-center gap-2.5 py-[7px] border-b border-[rgba(27,35,29,0.06)]'>
      <div
        className={`w-5 h-5 rounded-full shrink-0 flex items-center justify-center transition-all ${
          done
            ? 'bg-[var(--landing-primary)] border-none'
            : active
              ? 'bg-transparent border-[1.5px] border-[var(--landing-primary)]'
              : 'bg-transparent border-[1.5px] border-[rgba(27,35,29,0.18)]'
        }`}
      >
        {done && (
          <Check
            size={10}
            className='text-[var(--landing-cream)] shrink-0'
            strokeWidth={2.5}
          />
        )}
        {active && (
          <div className='w-1.5 h-1.5 rounded-full bg-[var(--landing-primary)]' />
        )}
      </div>
      <span
        className={`font-[inherit] text-[13px] flex-1 tracking-tight ${
          done
            ? 'text-[var(--landing-charcoal)] font-medium'
            : active
              ? 'text-[var(--landing-primary)] font-semibold'
              : 'text-[rgba(27,35,29,0.4)] font-normal'
        }`}
      >
        {label}
      </span>
      {active && (
        <span className='text-[9px] font-bold tracking-[0.06em] uppercase text-[var(--landing-primary)] bg-[rgba(0,140,76,0.1)] py-0.5 px-1.5 rounded font-[inherit]'>
          Now
        </span>
      )}
    </div>
  )
}
