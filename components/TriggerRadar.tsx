'use client'

import { useState, useEffect } from 'react'
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

interface TriggerRadarProps {
  triggers: Array<{ trigger: string; score: number }>
}

const SHORT_LABELS: Record<string, string> = {
  'Vulnerability cue': 'Vulnerability',
  'Infant attachment': 'Infant Bond',
  'Anthropomorphism': 'Anthropo.',
  'Moral framing': 'Moral',
  'Conflict narrative': 'Conflict',
  'Hope/redemption': 'Hope',
}

export default function TriggerRadar({ triggers }: TriggerRadarProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 400)
    return () => clearTimeout(t)
  }, [])

  const data = triggers.map((t) => ({
    subject: SHORT_LABELS[t.trigger] || t.trigger,
    full: t.trigger,
    score: t.score,
  }))

  return (
    <div className="w-full">
      <div className="mb-6">
        <h3 className="text-[#E6EDF3] font-bold text-xl">Emotional Trigger Breakdown</h3>
        <p className="text-[#8B949E] text-sm mt-1">Psychological levers detected in this story</p>
      </div>

      {visible && (
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={data} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
            <PolarGrid stroke="#21262D" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: '#8B949E', fontSize: 11, fontFamily: 'Inter, sans-serif' }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tick={{ fill: '#6E7681', fontSize: 9 }}
              tickCount={4}
              axisLine={false}
              stroke="#30363D"
            />
            <Radar
              name="Trigger Strength"
              dataKey="score"
              stroke="#58A6FF"
              fill="#58A6FF"
              fillOpacity={0.18}
              strokeWidth={2}
              dot={{ fill: '#58A6FF', r: 4, stroke: '#0D1117', strokeWidth: 1.5 }}
              animationDuration={1200}
              animationEasing="ease-out"
            />
            <Tooltip
              contentStyle={{
                background: '#161B22',
                border: '1px solid #30363D',
                borderRadius: '8px',
                color: '#E6EDF3',
                fontSize: '12px',
                fontFamily: 'Inter, sans-serif',
              }}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              formatter={(value: number, _name: string, props: any) => [
                `${value}/100`,
                props?.payload?.full || 'Trigger Strength',
              ]}
              labelStyle={{ display: 'none' }}
            />
          </RadarChart>
        </ResponsiveContainer>
      )}

      {/* Trigger scores list */}
      <div className="grid grid-cols-2 gap-2 mt-2">
        {triggers.map((t) => (
          <div key={t.trigger} className="flex items-center justify-between p-2.5 rounded-lg bg-[#161B22] border border-[#30363D]">
            <span className="text-[#8B949E] text-xs leading-tight">{t.trigger}</span>
            <div className="flex items-center gap-2 ml-2 shrink-0">
              <div className="w-12 h-1.5 rounded-full bg-[#21262D] overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${t.score}%`, background: '#58A6FF' }}
                />
              </div>
              <span className="text-[#58A6FF] font-bold text-xs tabular-nums w-8 text-right">{t.score}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
