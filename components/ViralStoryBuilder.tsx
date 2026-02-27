'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const elements = [
  {
    id: 'abandonment',
    label: 'Add Abandonment',
    points: 10,
    description: 'Creates an emotional hook through vulnerability narrative. Establishes empathy by presenting a subject in distress.',
    color: '#8B949E',
  },
  {
    id: 'baby_animal',
    label: 'Add Baby Animal',
    points: 25,
    description: 'Activates high-arousal positive emotions. Universal infant appeal triggers nurturing responses and broad demographic resonance.',
    color: '#58A6FF',
  },
  {
    id: 'moral_outrage',
    label: 'Add Moral Outrage',
    points: 30,
    description: 'Most powerful viral trigger. Righteous indignation compels action and enables social currency through value signaling.',
    color: '#FF7B72',
  },
  {
    id: 'hopeful_ending',
    label: 'Add Hopeful Ending',
    points: 25,
    description: 'Positive emotional payoff through resolution. People preferentially share uplifting content that generates feel-good responses.',
    color: '#3FB950',
  },
  {
    id: 'social_proof',
    label: 'Add Social Proof',
    points: 15,
    description: 'Leverages FOMO and bandwagon heuristics. Acts as credibility amplifier, boosting engagement through demonstrated popularity.',
    color: '#D29922',
  },
]

const MAX_SCORE = elements.reduce((acc, e) => acc + e.points, 0)

function useCountUp(target: number, duration = 600) {
  const [count, setCount] = useState(target)
  const prevRef = useRef(target)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const from = prevRef.current
    const to = target
    if (from === to) return
    const startTime = performance.now()

    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 2)
      setCount(Math.round(from + (to - from) * eased))
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        prevRef.current = to
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [target, duration])

  return count
}

function getViralRating(score: number) {
  if (score === 0) return { label: 'Not Viral', color: '#6E7681' }
  if (score <= 20) return { label: 'Barely Viral', color: '#8B949E' }
  if (score <= 50) return { label: 'Low Virality', color: '#D29922' }
  if (score <= 80) return { label: 'Moderate Virality', color: '#58A6FF' }
  if (score < MAX_SCORE) return { label: 'High Virality', color: '#3FB950' }
  return { label: 'Maximum Virality', color: '#FF7B72' }
}

export default function ViralStoryBuilder() {
  const [enabled, setEnabled] = useState<Record<string, boolean>>({})

  const rawScore = elements.reduce((acc, e) => acc + (enabled[e.id] ? e.points : 0), 0)
  const animatedScore = useCountUp(rawScore)
  const pct = (rawScore / MAX_SCORE) * 100
  const rating = getViralRating(rawScore)

  return (
    <section className="py-16 px-4 bg-[#0D1117]">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#30363D] bg-[#161B22] text-[#8B949E] text-xs font-semibold tracking-widest uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#58A6FF]" />
            Interactive Module
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#E6EDF3] text-balance mb-4">
            Build Your Own Viral Story
          </h2>
          <p className="text-[#8B949E] text-lg max-w-2xl mx-auto leading-relaxed">
            Virality isn't random. It's engineered through strategic deployment of psychological triggers. Toggle each element to see how they compound shareability.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Toggles */}
          <div className="space-y-3">
            <h3 className="text-[#8B949E] text-xs font-semibold uppercase tracking-widest mb-4">Story Elements</h3>
            {elements.map((el, i) => (
              <motion.div
                key={el.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="p-4 rounded-xl border transition-all"
                style={{
                  borderColor: enabled[el.id] ? el.color + '55' : '#30363D',
                  background: enabled[el.id] ? el.color + '0C' : '#161B22',
                }}
              >
                <div className="flex items-start gap-3">
                  {/* Toggle */}
                  <button
                    onClick={() => setEnabled((prev) => ({ ...prev, [el.id]: !prev[el.id] }))}
                    role="switch"
                    aria-checked={!!enabled[el.id]}
                    className="relative shrink-0 w-11 h-6 rounded-full transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#58A6FF] mt-0.5"
                    style={{ background: enabled[el.id] ? el.color : '#30363D' }}
                  >
                    <motion.span
                      animate={{ x: enabled[el.id] ? 22 : 2 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm"
                    />
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[#E6EDF3] font-semibold text-sm">{el.label}</span>
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded-full shrink-0"
                        style={{ color: el.color, background: el.color + '18' }}
                      >
                        +{el.points} pts
                      </span>
                    </div>
                    <p className="text-[#8B949E] text-xs leading-relaxed">{el.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: Score display */}
          <div className="flex flex-col">
            <h3 className="text-[#8B949E] text-xs font-semibold uppercase tracking-widest mb-4">Predicted Virality Score</h3>

            <div className="flex-1 p-6 rounded-xl border border-[#30363D] bg-[#161B22] flex flex-col items-center justify-center gap-6">
              {/* Big score */}
              <div className="text-center">
                <div className="flex items-baseline justify-center gap-1">
                  <span
                    className="text-7xl font-bold tabular-nums transition-colors duration-300"
                    style={{ color: rating.color }}
                  >
                    {animatedScore}
                  </span>
                  <span className="text-2xl text-[#8B949E] font-medium">/{MAX_SCORE}</span>
                </div>
                <motion.div
                  key={rating.label}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 inline-block px-4 py-1.5 rounded-full font-bold text-sm"
                  style={{ color: rating.color, background: rating.color + '1A', border: `1px solid ${rating.color}44` }}
                >
                  {rating.label}
                </motion.div>
              </div>

              {/* Progress bar */}
              <div className="w-full">
                <div className="h-3 w-full bg-[#21262D] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    animate={{ width: `${pct}%` }}
                    transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                    style={{ background: rating.color }}
                  />
                </div>
                <div className="flex justify-between mt-1.5">
                  <span className="text-[#6E7681] text-xs">0</span>
                  <span className="text-[#6E7681] text-xs">{MAX_SCORE} pts max</span>
                </div>
              </div>

              {/* Active elements */}
              <div className="w-full">
                <p className="text-[#6E7681] text-xs mb-3 uppercase tracking-widest">Active triggers</p>
                <div className="flex flex-wrap gap-2">
                  <AnimatePresence mode="popLayout">
                  {elements.filter((e) => enabled[e.id]).length === 0 ? (
                    <motion.span key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-[#6E7681] text-sm">No elements selected yet</motion.span>
                  ) : (
                    elements
                      .filter((e) => enabled[e.id])
                      .map((e) => (
                        <motion.span
                          key={e.id}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="px-2.5 py-1 rounded-full text-xs font-semibold"
                          style={{ color: e.color, background: e.color + '18', border: `1px solid ${e.color}33` }}
                        >
                          +{e.points} {e.label.replace('Add ', '')}
                        </motion.span>
                      ))
                  )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
