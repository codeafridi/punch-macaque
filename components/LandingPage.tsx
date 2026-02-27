'use client'

import { motion } from 'framer-motion'
import { useExperimentStore } from '@/lib/store'

export default function LandingPage() {
  const setStep = useExperimentStore((s) => s.setStep)

  return (
    <main className="min-h-screen bg-[#0D1117] flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden">
      {/* Background grid effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(88,166,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(88,166,255,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      {/* Glow orb */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(88,166,255,0.06) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Lab badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#30363D] bg-[#161B22] text-[#8B949E] text-sm font-medium mb-8 tracking-wide"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#58A6FF] animate-pulse" />
          THE VIRAL EMOTION LAB · CASE STUDY #1
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          className="text-balance text-4xl md:text-5xl lg:text-[56px] font-bold text-[#E6EDF3] leading-tight tracking-tight mb-6"
        >
          How Much of Your Empathy Is Real—And How Much Is Engineered?
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          className="text-lg md:text-xl text-[#8B949E] mb-4 leading-relaxed"
        >
          An interactive experiment exploring how framing turns ordinary stories into viral emotional events.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
          className="space-y-4 text-[#8B949E] text-base leading-relaxed mb-10 max-w-2xl mx-auto"
        >
          <p>
            Every day, we encounter stories that move us—tales of abandoned animals, human triumph, or moral outrage. But how much of our emotional response is genuine, and how much is the result of deliberate narrative design?
          </p>
          <p>
            This behavioral experiment reveals the psychological triggers embedded in viral content. You'll read the same story told three different ways, tracking how your empathy, sharing behavior, and emotional intensity shift based solely on how information is framed.
          </p>
          <p>
            By the end, you'll see the invisible architecture of emotional manipulation—the specific techniques that turn ordinary events into viral phenomena.
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
          className="flex flex-wrap justify-center gap-6 mb-10"
        >
          {[
            { label: 'Duration', value: '8–10 min' },
            { label: 'Participants', value: '12,847' },
            { label: 'Avg. Empathy', value: '67/100' },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center px-6 py-3 rounded-lg border border-[#30363D] bg-[#161B22]">
              <span className="text-2xl font-bold text-[#E6EDF3]">{stat.value}</span>
              <span className="text-xs text-[#8B949E] mt-0.5 uppercase tracking-widest">{stat.label}</span>
            </div>
          ))}
        </motion.div>

        <motion.button
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.5 }}
          whileHover={{ scale: 1.03, boxShadow: '0 0 32px rgba(88,166,255,0.35)' }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setStep(1)}
          className="px-8 py-4 rounded-lg bg-[#58A6FF] text-[#0D1117] font-bold text-lg cursor-pointer transition-colors hover:bg-[#79B8FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#58A6FF]"
        >
          Begin Experiment
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 text-xs text-[#6E7681] max-w-lg mx-auto leading-relaxed"
        >
          <strong className="text-[#8B949E]">Research Disclosure:</strong> This experiment analyzes how narrative framing influences emotional response and sharing behavior. You will evaluate the same factual story presented with different rhetorical techniques, then receive data-driven insights into your reactions. Your responses are anonymous.
        </motion.p>
      </div>
    </main>
  )
}
