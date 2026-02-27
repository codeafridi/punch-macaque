# The Viral Emotion Lab

An interactive web experiment that shows how different narrative framings can change empathy, sharing intent, and perceived virality for the same underlying story.

This project is built with Next.js (App Router), React, Tailwind CSS v4, Framer Motion, and Zustand.

## What This Project Does

Users read the same story in three different framings:

1. Neutral Journalistic
2. Emotional Storytelling
3. Critical Ethical

After each framing, users answer a short question set. At the end, the app computes and visualizes:

- empathy differences
- emotional trigger profile
- estimated virality score
- behavioral/psychological interpretation of responses

## Core Features

- Multi-step guided experiment flow
- Framing-based story presentation
- Anonymous response capture per step
- Result analytics dashboard with charts and summaries
- Local session persistence using Zustand + `sessionStorage`
- Motion-driven UI transitions with Framer Motion

## Tech Stack

- Next.js `16.1.6`
- React `19.2.4`
- TypeScript
- Tailwind CSS v4 (`@tailwindcss/postcss`)
- Framer Motion
- Zustand

## Project Structure

```text
app/
  layout.tsx          # Root layout and global CSS import
  page.tsx            # Entry page (client component)
  globals.css         # Tailwind + design tokens + base styles

components/
  ExperimentFlow.tsx
  LandingPage.tsx
  StoryFraming.tsx
  QuestionSet.tsx
  ResultsPage.tsx
  EmpathyChart.tsx
  TriggerRadar.tsx
  ViralityScore.tsx
  PsychologicalAnalysis.tsx
  GlobalStats.tsx
  ViralStoryBuilder.tsx

lib/
  framings.ts         # Story framing datasets/content
  store.ts            # Zustand state, persistence, scoring utilities

postcss.config.mjs    # Tailwind PostCSS plugin config
tsconfig.json         # TypeScript + path alias config (@/*)
package.json
```

## Getting Started

### Prerequisites

- Node.js 20+ (recommended)
- npm (comes with Node.js)

### Install

```bash
npm install
```

### Run in Development

```bash
npm run dev
```

Open:

`http://localhost:3000`

### Production Build

```bash
npm run build
npm run start
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Data and State

- App state is managed in `lib/store.ts` with Zustand.
- Responses are persisted in browser session storage (`sessionStorage`) under the key:
  - `viral-emotion-lab`
- Data resets when the browser session ends or when the user clicks restart.

## Troubleshooting

### Styles look plain / Tailwind classes not applying

1. Ensure dependencies are installed:
   - `npm install`
2. Ensure `postcss.config.mjs` exists in project root.
3. Restart dev server:
   - stop server
   - remove cache folder: `.next`
   - run `npm run dev`

### Hydration warning in browser

If you see hydration mismatch warnings, test once in an incognito window (extensions off). Some extensions (for example dark-mode injectors) modify DOM attributes before React hydrates.

### Module not found for `@/...`

Ensure `tsconfig.json` includes:

```json
"baseUrl": ".",
"paths": {
  "@/*": ["./*"]
}
```

## Notes

- This repository focuses on front-end experiment logic and visualization.
- No backend/API setup is required to run locally.
