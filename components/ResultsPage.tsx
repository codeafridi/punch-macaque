'use client'

import { motion } from 'framer-motion'
import { useExperimentStore, calculateViralityScore, getEmotionalTriggerScores } from '@/lib/store'
import EmpathyChart from './EmpathyChart'
import TriggerRadar from './TriggerRadar'
import ViralityScore from './ViralityScore'
import PsychologicalAnalysis from './PsychologicalAnalysis'
import GlobalStats from './GlobalStats'
import ViralStoryBuilder from './ViralStoryBuilder'

export default function ResultsPage() {
  const { responses, reset } = useExperimentStore()
  const viralityScore = calculateViralityScore(responses)
  const triggerScores = getEmotionalTriggerScores(responses)

  return (
    <div className="min-h-screen bg-[#0D1117] text-[#E6EDF3]">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-[#30363D]">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(88,166,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(88,166,255,0.03) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="relative z-10 max-w-5xl mx-auto px-4 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#30363D] bg-[#161B22] text-[#8B949E] text-xs font-semibold tracking-widest uppercase mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#3FB950] animate-pulse" />
            EXPERIMENT COMPLETE
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-[#E6EDF3] leading-tight tracking-tight mb-4 text-balance"
          >
            Your Emotional Profile
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[#8B949E] text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Here's what your responses revealed about how framing engineered your emotional response.
          </motion.p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-4 py-12 space-y-6">
        {/* Row 1: Empathy chart + Virality score */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 p-6 rounded-2xl border border-[#30363D] bg-[#161B22]"
          >
            <EmpathyChart responses={responses} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="p-6 rounded-2xl border border-[#30363D] bg-[#161B22] flex flex-col items-center justify-center"
          >
            <ViralityScore score={viralityScore} />
          </motion.div>
        </div>

        {/* Row 2: Radar + Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="p-6 rounded-2xl border border-[#30363D] bg-[#161B22]"
          >
            <TriggerRadar triggers={triggerScores} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="p-6 rounded-2xl border border-[#30363D] bg-[#161B22]"
          >
            <PsychologicalAnalysis responses={responses} />
          </motion.div>
        </div>

        {/* Global Stats */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="p-6 rounded-2xl border border-[#30363D] bg-[#161B22]"
        >
          <GlobalStats />
        </motion.div>

        {/* Final message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="relative overflow-hidden p-8 md:p-12 rounded-2xl border border-[#58A6FF]/30 text-center"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(88,166,255,0.08) 0%, #161B22 70%)' }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-[#58A6FF]/60 to-transparent" />
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#E6EDF3] mb-4 text-balance">
            You didn't just read a story.{' '}
            <span className="text-[#58A6FF]">You experienced engineered framing.</span>
          </h2>
          <p className="text-[#8B949E] text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-6">
            Every news story, social media post, and viral video makes framing choices—what to emphasize, what language to use, which details to include or omit. These choices aren't neutral. They activate specific psychological triggers that shape your emotional response, moral judgments, and sharing behavior.
          </p>
          <p className="text-[#8B949E] text-sm max-w-xl mx-auto leading-relaxed">
            The Punch macaque story contains the same factual events in all three versions. Only the framing changed. Yet your responses likely varied significantly.
          </p>
        </motion.div>
      </div>

      {/* Viral Story Builder section */}
      <div className="border-t border-[#30363D]">
        <ViralStoryBuilder />
      </div>

      {/* Footer actions */}
      <div className="border-t border-[#30363D] py-10 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#8B949E] text-sm">
            The Viral Emotion Lab · Case Study #1: Punch the Macaque
          </p>
          <button
            onClick={reset}
            className="px-5 py-2.5 rounded-lg border border-[#30363D] text-[#8B949E] text-sm font-medium cursor-pointer hover:border-[#58A6FF]/50 hover:text-[#58A6FF] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#58A6FF]"
          >
            Restart Experiment
          </button>
        </div>
        <div className="max-w-5xl mx-auto mt-6 pt-6 border-t border-[#21262D]">
          <p className="text-[#6E7681] text-xs text-center">Generated by Superagent.</p>
        </div>
      </div>
    </div>
  )
}
