import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type ViralPrediction = 'Low' | 'Medium' | 'High' | null
export type SympathyTarget = 'Monkey' | 'Zoo' | 'Activists' | 'Neutral' | null

export interface FramingResponse {
  empathyScore: number
  wouldShare: boolean | null
  sympathy: SympathyTarget
  viralPrediction: ViralPrediction
}

export interface ExperimentState {
  step: number // 0=landing, 1=framing1, 2=q1, 3=framing2, 4=q2, 5=framing3, 6=q3, 7=results
  responses: [FramingResponse, FramingResponse, FramingResponse]
  currentResponse: FramingResponse
  setStep: (step: number) => void
  setCurrentEmpathy: (score: number) => void
  setCurrentShare: (val: boolean) => void
  setCurrentSympathy: (val: SympathyTarget) => void
  setCurrentViral: (val: ViralPrediction) => void
  commitResponse: (index: 0 | 1 | 2) => void
  reset: () => void
}

const emptyResponse = (): FramingResponse => ({
  empathyScore: 50,
  wouldShare: null,
  sympathy: null,
  viralPrediction: null,
})

export const useExperimentStore = create<ExperimentState>()(
  persist(
    (set) => ({
      step: 0,
      responses: [emptyResponse(), emptyResponse(), emptyResponse()],
      currentResponse: emptyResponse(),
      setStep: (step) => set({ step }),
      setCurrentEmpathy: (score) =>
        set((s) => ({ currentResponse: { ...s.currentResponse, empathyScore: score } })),
      setCurrentShare: (val) =>
        set((s) => ({ currentResponse: { ...s.currentResponse, wouldShare: val } })),
      setCurrentSympathy: (val) =>
        set((s) => ({ currentResponse: { ...s.currentResponse, sympathy: val } })),
      setCurrentViral: (val) =>
        set((s) => ({ currentResponse: { ...s.currentResponse, viralPrediction: val } })),
      commitResponse: (index) =>
        set((s) => {
          const responses = [...s.responses] as [FramingResponse, FramingResponse, FramingResponse]
          responses[index] = { ...s.currentResponse }
          return { responses, currentResponse: emptyResponse() }
        }),
      reset: () =>
        set({
          step: 0,
          responses: [emptyResponse(), emptyResponse(), emptyResponse()],
          currentResponse: emptyResponse(),
        }),
    }),
    {
      name: 'viral-emotion-lab',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)

// Scoring logic
export function calculateViralityScore(responses: [FramingResponse, FramingResponse, FramingResponse]): number {
  const avgEmpathy = responses.reduce((acc, r) => acc + r.empathyScore, 0) / 3
  const maxEmpathy = Math.max(...responses.map((r) => r.empathyScore))
  const shareCount = responses.filter((r) => r.wouldShare === true).length
  const viralHighCount = responses.filter((r) => r.viralPrediction === 'High').length
  const viralMedCount = responses.filter((r) => r.viralPrediction === 'Medium').length

  // Weighted formula: emotional intensity (30%), social proof potential (20%), narrative (15%), moral (15%), vulnerability (10%), practical (10%)
  const emotionalScore = (maxEmpathy * 0.3)
  const shareScore = (shareCount / 3) * 100 * 0.2
  const viralScore = ((viralHighCount * 1 + viralMedCount * 0.5) / 3) * 100 * 0.15
  const narrativeScore = avgEmpathy * 0.15
  const vulnerabilityScore = responses[1].empathyScore * 0.1
  const practicalScore = (shareCount > 0 ? 70 : 30) * 0.1

  return Math.min(100, Math.round(emotionalScore + shareScore + viralScore + narrativeScore + vulnerabilityScore + practicalScore))
}

export function getViralLabel(score: number): string {
  if (score >= 75) return 'High Potential'
  if (score >= 50) return 'Moderate'
  return 'Low'
}

export function getEmotionalTriggerScores(responses: [FramingResponse, FramingResponse, FramingResponse]) {
  const neutral = responses[0]
  const emotional = responses[1]
  const critical = responses[2]

  return [
    { trigger: 'Vulnerability cue', score: Math.round((emotional.empathyScore * 0.78 + neutral.empathyScore * 0.3) / 1.3) },
    { trigger: 'Infant attachment', score: Math.round(emotional.empathyScore * 0.85) },
    { trigger: 'Anthropomorphism', score: Math.round((emotional.empathyScore + neutral.empathyScore) * 0.5 * 0.7) },
    { trigger: 'Moral framing', score: Math.round((critical.empathyScore * 0.82 + emotional.empathyScore * 0.4) / 1.2) },
    { trigger: 'Conflict narrative', score: Math.round((critical.empathyScore * 0.75 + neutral.empathyScore * 0.3) / 1.1) },
    { trigger: 'Hope/redemption', score: Math.round((emotional.empathyScore * 0.9 + neutral.empathyScore * 0.2) / 1.2) },
  ]
}
