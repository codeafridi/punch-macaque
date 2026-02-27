'use client'

import { AnimatePresence } from 'framer-motion'
import { useExperimentStore } from '@/lib/store'
import { framings } from '@/lib/framings'
import LandingPage from './LandingPage'
import StoryFraming from './StoryFraming'
import QuestionSet from './QuestionSet'
import ResultsPage from './ResultsPage'

// Steps:
// 0 = landing
// 1 = framing 1
// 2 = questions 1
// 3 = framing 2
// 4 = questions 2
// 5 = framing 3
// 6 = questions 3
// 7 = results

export default function ExperimentFlow() {
  const { step, setStep } = useExperimentStore()

  return (
    <AnimatePresence mode="wait">
      {step === 0 && <LandingPage key="landing" />}

      {step === 1 && (
        <StoryFraming
          key="framing-1"
          framing={framings[0]}
          onContinue={() => setStep(2)}
        />
      )}
      {step === 2 && (
        <QuestionSet
          key="questions-1"
          framingIndex={0}
          onComplete={() => setStep(3)}
        />
      )}

      {step === 3 && (
        <StoryFraming
          key="framing-2"
          framing={framings[1]}
          onContinue={() => setStep(4)}
        />
      )}
      {step === 4 && (
        <QuestionSet
          key="questions-2"
          framingIndex={1}
          onComplete={() => setStep(5)}
        />
      )}

      {step === 5 && (
        <StoryFraming
          key="framing-3"
          framing={framings[2]}
          onContinue={() => setStep(6)}
        />
      )}
      {step === 6 && (
        <QuestionSet
          key="questions-3"
          framingIndex={2}
          onComplete={() => setStep(7)}
        />
      )}

      {step === 7 && <ResultsPage key="results" />}
    </AnimatePresence>
  )
}
