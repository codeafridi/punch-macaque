'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useExperimentStore, type SympathyTarget, type ViralPrediction } from '@/lib/store'
import { framings } from '@/lib/framings'

interface QuestionSetProps {
  framingIndex: 0 | 1 | 2
  onComplete: () => void
}

export default function QuestionSet({ framingIndex, onComplete }: QuestionSetProps) {
  const framing = framings[framingIndex]
  const {
    currentResponse,
    setCurrentEmpathy,
    setCurrentShare,
    setCurrentSympathy,
    setCurrentViral,
    commitResponse,
  } = useExperimentStore()

  const [submitted, setSubmitted] = useState(false)

  const allAnswered =
    currentResponse.wouldShare !== null &&
    currentResponse.sympathy !== null &&
    currentResponse.viralPrediction !== null

  const handleContinue = () => {
    if (!allAnswered) return
    if (!submitted) {
      commitResponse(framingIndex)
      setSubmitted(true)
    }
    onComplete()
  }

  const sympathyOptions: SympathyTarget[] = ['Monkey', 'Zoo', 'Activists', 'Neutral']
  const viralOptions: ViralPrediction[] = ['Low', 'Medium', 'High']

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="min-h-screen bg-[#0D1117] flex flex-col items-center px-4 py-16"
    >
      <div className="w-full max-w-[700px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <span
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold tracking-widest uppercase"
            style={{ borderColor: framing.accentColor + '55', color: framing.accentColor, background: framing.accentColor + '10' }}
          >
            QUESTIONS · FRAMING {framingIndex + 1}
          </span>
          <span className="text-[#8B949E] text-sm">Your responses are tracked anonymously</span>
        </div>

        {/* Progress bar */}
        <div className="h-0.5 w-full bg-[#21262D] rounded-full mb-10 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: framing.accentColor }}
            initial={{ width: 0 }}
            animate={{ width: `${((framingIndex + 0.5) / 3) * 100}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        </div>

        <div className="space-y-8">
          {/* Q1: Empathy Slider */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="p-6 rounded-xl border border-[#30363D] bg-[#161B22]"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#E6EDF3] font-semibold text-lg">How emotionally affected are you?</h3>
              <span
                className="text-2xl font-bold tabular-nums"
                style={{ color: framing.accentColor }}
              >
                {currentResponse.empathyScore}
              </span>
            </div>
            <div className="relative">
              <input
                type="range"
                min={0}
                max={100}
                value={currentResponse.empathyScore}
                onChange={(e) => {
                  setCurrentEmpathy(Number(e.target.value))
                }}
                className="w-full"
                style={{
                  accentColor: framing.accentColor,
                }}
              />
              <div className="flex justify-between mt-2">
                <span className="text-xs text-[#8B949E]">Not at all</span>
                <span className="text-xs text-[#8B949E]">Extremely</span>
              </div>
            </div>
          </motion.div>

          {/* Q2: Would you share */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="p-6 rounded-xl border border-[#30363D] bg-[#161B22]"
          >
              <h3 className="text-[#E6EDF3] font-semibold text-lg mb-4">Would you share this?</h3>
              <div className="flex gap-3">
                {([true, false] as const).map((val) => (
                  <button
                    key={String(val)}
                    onClick={() => {
                      setCurrentShare(val)
                    }}
                    className="flex-1 py-3 rounded-lg font-semibold text-base cursor-pointer border transition-all focus-visible:outline-none focus-visible:ring-2"
                    style={
                      currentResponse.wouldShare === val
                        ? {
                            background: framing.accentColor + '22',
                            borderColor: framing.accentColor,
                            color: framing.accentColor,
                          }
                        : {
                            background: '#21262D',
                            borderColor: '#30363D',
                            color: '#8B949E',
                          }
                    }
                  >
                    {val ? 'Yes' : 'No'}
                  </button>
                ))}
              </div>
          </motion.div>

          {/* Q3: Sympathy target */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="p-6 rounded-xl border border-[#30363D] bg-[#161B22]"
          >
            <h3 className="text-[#E6EDF3] font-semibold text-lg mb-4">Who do you sympathize with most?</h3>
            <div className="grid grid-cols-2 gap-3">
              {sympathyOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setCurrentSympathy(opt)
                  }}
                  className="py-3 px-4 rounded-lg font-medium text-sm cursor-pointer border transition-all focus-visible:outline-none focus-visible:ring-2 text-left"
                  style={
                    currentResponse.sympathy === opt
                      ? {
                          background: framing.accentColor + '22',
                          borderColor: framing.accentColor,
                          color: framing.accentColor,
                        }
                      : {
                          background: '#21262D',
                          borderColor: '#30363D',
                          color: '#8B949E',
                        }
                  }
                >
                  {opt}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Q4: Viral prediction */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="p-6 rounded-xl border border-[#30363D] bg-[#161B22]"
          >
            <h3 className="text-[#E6EDF3] font-semibold text-lg mb-4">How viral do you think this story will be?</h3>
            <div className="flex gap-3">
              {viralOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setCurrentViral(opt)}
                  className="flex-1 py-3 rounded-lg font-semibold text-sm cursor-pointer border transition-all focus-visible:outline-none focus-visible:ring-2"
                  style={
                    currentResponse.viralPrediction === opt
                      ? {
                          background: framing.accentColor + '22',
                          borderColor: framing.accentColor,
                          color: framing.accentColor,
                        }
                      : {
                          background: '#21262D',
                          borderColor: '#30363D',
                          color: '#8B949E',
                        }
                  }
                >
                  {opt}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Continue button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <button
            onClick={handleContinue}
            disabled={!allAnswered}
            className={`w-full py-4 rounded-lg font-bold text-base transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 ${
              allAnswered
                ? 'text-[#0D1117] hover:brightness-110'
                : 'bg-[#21262D] text-[#6E7681] cursor-not-allowed'
            }`}
            style={allAnswered ? { background: framing.accentColor, boxShadow: `0 0 20px ${framing.accentColor}30` } : {}}
          >
            {framingIndex < 2 ? 'Continue to Next Story' : 'See My Results'}
          </button>
          {!allAnswered && (
            <p className="text-center text-[#8B949E] text-sm mt-3">Answer all questions to continue</p>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}
