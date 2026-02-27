'use client'

import { useState, useEffect } from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts'
import type { FramingResponse } from '@/lib/store'

interface EmpathyChartProps {
  responses: [FramingResponse, FramingResponse, FramingResponse]
}

const LABELS = ['Neutral Journalistic', 'Emotional Storytelling', 'Critical Ethical']

export default function EmpathyChart({ responses }: EmpathyChartProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 300)
    return () => clearTimeout(t)
  }, [])

  const data = responses.map((r, i) => ({
    name: LABELS[i],
    short: ['Neutral', 'Emotional', 'Critical'][i],
    score: r.empathyScore,
  }))

  const maxScore = Math.max(...data.map((d) => d.score))
  const minScore = Math.min(...data.map((d) => d.score))
  const delta = maxScore - minScore
  const avgScore = Math.round(data.reduce((s, d) => s + d.score, 0) / data.length)
  const peakFraming = data.find((d) => d.score === maxScore)?.short ?? '—'

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
        <div>
          <h3 className="text-[#E6EDF3] font-bold text-xl">Your Empathy Trajectory</h3>
          <p className="text-[#8B949E] text-sm mt-1">How your emotional response shifted across framings</p>
        </div>
        <div className="flex gap-4">
          <div className="text-right">
            <div className="text-[#58A6FF] font-bold text-lg">{avgScore}/100</div>
            <div className="text-[#8B949E] text-xs">Avg. score</div>
          </div>
          <div className="text-right">
            <div className="font-bold text-lg" style={{ color: delta > 10 ? '#3FB950' : delta > 0 ? '#D29922' : '#8B949E' }}>
              {delta > 0 ? `+${delta}` : delta} pts
            </div>
            <div className="text-[#8B949E] text-xs">Framing shift</div>
          </div>
        </div>
      </div>

      {visible && (
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="empathyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#58A6FF" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#58A6FF" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#21262D" vertical={false} />
            <XAxis
              dataKey="short"
              tick={{ fill: '#8B949E', fontSize: 12, fontFamily: 'Inter, sans-serif' }}
              axisLine={{ stroke: '#30363D' }}
              tickLine={false}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fill: '#8B949E', fontSize: 11, fontFamily: 'Inter, sans-serif' }}
              axisLine={false}
              tickLine={false}
              tickCount={5}
            />
            <Tooltip
              contentStyle={{
                background: '#161B22',
                border: '1px solid #30363D',
                borderRadius: '8px',
                color: '#E6EDF3',
                fontSize: '13px',
                fontFamily: 'Inter, sans-serif',
              }}
              formatter={(value: number) => [`${value}/100`, 'Empathy Score']}
              labelStyle={{ color: '#8B949E', marginBottom: '4px' }}
              cursor={{ stroke: '#58A6FF', strokeWidth: 1, strokeDasharray: '4 2' }}
            />
            <Area
              type="monotone"
              dataKey="score"
              stroke="#58A6FF"
              strokeWidth={2.5}
              fill="url(#empathyGrad)"
              dot={{ fill: '#58A6FF', stroke: '#0D1117', strokeWidth: 2, r: 5 }}
              activeDot={{ r: 7, fill: '#58A6FF', stroke: '#0D1117', strokeWidth: 2 }}
              animationDuration={1500}
              animationEasing="ease-out"
            />
            <ReferenceLine y={50} stroke="#30363D" strokeDasharray="4 3" label={{ value: 'Baseline 50', position: 'right', fill: '#6E7681', fontSize: 10 }} />
          </AreaChart>
        </ResponsiveContainer>
      )}

      {/* Data points */}
      <div className="grid grid-cols-3 gap-3 mt-4">
        {data.map((d, i) => (
          <div
            key={i}
            className="p-3 rounded-lg border text-center transition-colors"
            style={
              d.score === maxScore
                ? { background: 'rgba(88,166,255,0.08)', borderColor: '#58A6FF44' }
                : { background: '#161B22', borderColor: '#30363D' }
            }
          >
            <div className="text-[#58A6FF] font-bold text-xl tabular-nums">{d.score}</div>
            <div className="text-[#8B949E] text-xs mt-0.5 leading-tight">{d.short}</div>
            {d.score === maxScore && (
              <div className="text-[10px] text-[#58A6FF] mt-1 font-semibold uppercase tracking-wide">Peak</div>
            )}
          </div>
        ))}
      </div>
      {delta > 0 && (
        <p className="text-[#6E7681] text-xs mt-3">
          Peak response during <span className="text-[#8B949E]">{peakFraming}</span> framing — a {delta}-point shift across versions.
        </p>
      )}
    </div>
  )
}
