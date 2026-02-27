'use client'

import { motion } from 'framer-motion'
import type { FramingResponse } from '@/lib/store'

interface PsychologicalAnalysisProps {
  responses: [FramingResponse, FramingResponse, FramingResponse]
}

export default function PsychologicalAnalysis({ responses }: PsychologicalAnalysisProps) {
  const [neutral, emotional, critical] = responses
  const empathyDelta = emotional.empathyScore - neutral.empathyScore
  const shareShift = emotional.wouldShare && !neutral.wouldShare
  const sympathyShift = emotional.sympathy !== critical.sympathy && emotional.sympathy !== null && critical.sympathy !== null

  const insights = [
    {
      icon: '↑',
      color: '#58A6FF',
      title: 'Framing Effect on Empathy',
      body: empathyDelta > 0
        ? `Your empathy score increased ${empathyDelta} points from the neutral to emotional framing. This shift was driven primarily by vulnerability cues and infant attachment triggers. The introduction of anthropomorphized language activated protective instincts documented in infant schema research.`
        : empathyDelta < 0
        ? `Your empathy score decreased ${Math.abs(empathyDelta)} points from the neutral to emotional framing—an unusual pattern that may indicate skepticism toward overt emotional manipulation. This suggests a well-calibrated resistance to narrative pressure.`
        : `Your empathy score remained stable across neutral and emotional framings, suggesting a strong analytical baseline that resists framing effects.`,
    },
    {
      icon: '⟳',
      color: '#3FB950',
      title: 'Sharing Behavior',
      body: shareShift
        ? `You were significantly more likely to share the emotional framing. This aligns with research showing that high-arousal emotions (awe, tenderness) are far more viral than low-arousal content, even when reporting identical facts.`
        : emotional.wouldShare
        ? `You indicated a willingness to share across framings—your sharing behavior appears driven by the story content itself rather than narrative style.`
        : `You were unlikely to share regardless of framing. This pattern is associated with higher media literacy and critical consumption habits.`,
    },
    {
      icon: '◎',
      color: '#D29922',
      title: 'Moral Attribution Shift',
      body: sympathyShift
        ? `Your sympathy target shifted between framings: ${emotional.sympathy} (emotional) vs. ${critical.sympathy} (critical). This demonstrates how narrative perspective shapes moral perception. The emotional framing centered the individual experience, while the critical framing redirected your focus toward systemic concerns.`
        : emotional.sympathy
        ? `Your sympathy consistently centered on ${emotional.sympathy} across framings, indicating a stable moral anchor that framing did not significantly alter.`
        : `Your sympathy responses reveal a neutral stance—you may be processing the story analytically rather than emotionally.`,
    },
    {
      icon: '⬡',
      color: '#BC8CFF',
      title: 'Psychological Triggers Activated',
      body: `The Punch macaque story activates six primary psychological mechanisms: (1) Infant schema response—triggered by baby animal imagery, (2) Abandonment narrative—creates protective instinct, (3) Anthropomorphism—projects human emotions onto the subject, (4) Moral urgency—critical framing activates systemic ethical concern, (5) Conflict-resolution arc—the "bullying to belonging" trajectory mirrors human social narratives, (6) Hope signal—the grooming scene delivers positive emotional payoff essential for viral sharing.`,
    },
  ]

  return (
    <div className="w-full">
      <h3 className="text-[#E6EDF3] font-bold text-xl mb-2">Psychological Analysis</h3>
      <p className="text-[#8B949E] text-sm mb-6">Personalized insights based on your response patterns</p>

      <div className="space-y-4">
        {insights.map((insight, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * i + 0.2, duration: 0.4 }}
            className="p-5 rounded-xl border border-[#30363D] bg-[#161B22]"
          >
            <div className="flex items-start gap-3">
              <span
                className="text-lg font-bold mt-0.5 shrink-0 w-7 h-7 flex items-center justify-center rounded-md"
                style={{ color: insight.color, background: insight.color + '18' }}
              >
                {insight.icon}
              </span>
              <div>
                <h4 className="text-[#E6EDF3] font-semibold text-sm mb-1.5" style={{ color: insight.color }}>
                  {insight.title}
                </h4>
                <p className="text-[#8B949E] text-sm leading-relaxed">{insight.body}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
