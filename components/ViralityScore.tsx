'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { getViralLabel } from '@/lib/store'

interface ViralityScoreProps {
  score: number
}

export default function ViralityScore({ score }: ViralityScoreProps) {
  const [display, setDisplay] = useState(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const duration = 2000
    const start = performance.now()

    const animate = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // Ease out
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(eased * score))
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      }
    }

    const timeout = setTimeout(() => {
      rafRef.current = requestAnimationFrame(animate)
    }, 500)

    return () => {
      clearTimeout(timeout)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [score])

  const label = getViralLabel(score)
  const labelColor = score >= 75 ? '#3FB950' : score >= 50 ? '#D29922' : '#8B949E'
  const circumference = 2 * Math.PI * 54
  const dashOffset = circumference - (display / 100) * circumference

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-[#E6EDF3] font-bold text-xl mb-2 self-start">Calculated Virality Score</h3>
      <p className="text-[#8B949E] text-sm mb-6 self-start">Based on your responses across all three framings</p>

      <div className="relative flex items-center justify-center">
        {/* Glow */}
        <div
          className="absolute inset-0 rounded-full blur-2xl opacity-30"
          style={{ background: labelColor }}
        />
        <svg width="140" height="140" viewBox="0 0 140 140" className="relative z-10">
          {/* Track */}
          <circle cx="70" cy="70" r="54" fill="none" stroke="#21262D" strokeWidth="10" />
          {/* Progress */}
          <circle
            cx="70"
            cy="70"
            r="54"
            fill="none"
            stroke={labelColor}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            transform="rotate(-90 70 70)"
            style={{ transition: 'stroke-dashoffset 0.05s linear' }}
          />
        </svg>
        <div className="absolute z-20 flex flex-col items-center">
          <span
            className="text-4xl font-bold tabular-nums"
            style={{ color: labelColor }}
          >
            {display}
          </span>
          <span className="text-[#8B949E] text-xs">/100</span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.2, duration: 0.4 }}
        className="mt-4 px-5 py-2 rounded-full font-bold text-sm"
        style={{ background: labelColor + '22', color: labelColor, border: `1px solid ${labelColor}55` }}
      >
        {label}
      </motion.div>

      <div className="mt-6 w-full p-4 rounded-lg bg-[#161B22] border border-[#30363D]">
        <p className="text-[#8B949E] text-xs leading-relaxed">
          Score derived from weighted formula: emotional intensity (30%), social proof (20%), narrative structure (15%), moral framing (15%), vulnerability cues (10%), practical value (10%).
        </p>
      </div>
    </div>
  )
}
