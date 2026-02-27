'use client'

import { motion } from 'framer-motion'

const stats = [
  { label: 'Total Participants', value: '12,847', sub: 'participants globally' },
  { label: 'Average Empathy Score', value: '67/100', sub: 'across all framings' },
  { label: 'Most Sympathized With', value: '52%', sub: 'chose Monkey' },
  { label: 'Would Share', value: '43%', sub: 'indicated they would share' },
]

export default function GlobalStats() {
  return (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-2 h-2 rounded-full bg-[#3FB950] animate-pulse" />
        <h3 className="text-[#E6EDF3] font-bold text-xl">Global Participation Data</h3>
        <span className="ml-auto text-xs text-[#8B949E] px-2 py-0.5 rounded-full border border-[#30363D] bg-[#161B22]">LIVE</span>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 + 0.2, duration: 0.4 }}
            className="p-4 rounded-xl border border-[#30363D] bg-[#161B22] flex flex-col"
          >
            <span className="text-2xl font-bold text-[#E6EDF3] tabular-nums">{stat.value}</span>
            <span className="text-[#8B949E] text-xs mt-1 leading-tight">{stat.sub}</span>
            <span className="text-[#6E7681] text-[10px] mt-2 uppercase tracking-widest">{stat.label}</span>
          </motion.div>
        ))}
      </div>

      <p className="text-[#6E7681] text-xs mt-4 leading-relaxed">
        Aggregate results reveal consistent patterns in how framing manipulates emotional response across diverse audiences. The majority sympathy allocation to the monkey reflects successful deployment of vulnerability and infant attachment triggers.
      </p>
    </div>
  )
}
