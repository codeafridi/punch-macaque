'use client'

import { motion } from 'framer-motion'
import { type Framing } from '@/lib/framings'

interface StoryFramingProps {
  framing: Framing
  onContinue: () => void
}

export default function StoryFraming({ framing, onContinue }: StoryFramingProps) {
  return (
    <motion.div
      key={framing.id}
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="min-h-screen bg-[#0D1117] flex flex-col items-center px-4 py-16"
    >
      <div className="w-full max-w-[700px] mx-auto">
        {/* Progress / badge */}
        <div className="flex items-center justify-between mb-8">
          <span
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold tracking-widest uppercase"
            style={{ borderColor: framing.accentColor + '55', color: framing.accentColor, background: framing.accentColor + '10' }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: framing.accentColor }} />
            {framing.badge}
          </span>
          <span className="text-[#8B949E] text-sm font-medium">{framing.label}</span>
        </div>

        {/* Progress bar */}
        <div className="h-0.5 w-full bg-[#21262D] rounded-full mb-10 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: framing.accentColor }}
            initial={{ width: 0 }}
            animate={{ width: `${(framing.id / 3) * 100}%` }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          />
        </div>

        {/* Story content */}
        <article>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 }}
            className="text-[#E6EDF3] font-bold text-2xl md:text-3xl leading-tight tracking-tight mb-8 text-balance"
            style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)' }}
          >
            {framing.title}
          </motion.h2>

          <div className="space-y-5">
            {framing.paragraphs.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: 'easeOut', delay: 0.2 + i * 0.1 }}
                className="text-[#C9D1D9] leading-[1.75] text-base md:text-[17px]"
              >
                {para}
              </motion.p>
            ))}
          </div>
        </article>

        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          whileHover={{ scale: 1.02, boxShadow: `0 0 24px ${framing.accentColor}40` }}
          whileTap={{ scale: 0.98 }}
          onClick={onContinue}
          className="mt-10 w-full md:w-auto px-8 py-4 rounded-lg font-bold text-[#0D1117] text-base cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 transition-all"
          style={{ background: framing.accentColor }}
        >
          Answer Questions About This Story
        </motion.button>
      </div>
    </motion.div>
  )
}
