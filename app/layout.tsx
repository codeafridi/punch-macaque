import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'The Viral Emotion Lab',
  description: 'An interactive experiment exploring how framing turns ordinary stories into viral emotional events.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="font-sans antialiased bg-[#0D1117] text-[#E6EDF3]">
        <div className="min-h-screen flex flex-col">
          <div className="flex-1">{children}</div>
          <footer className="border-t border-[#30363D] bg-[#0D1117]">
            <div className="max-w-5xl mx-auto px-4 py-4 text-center">
              <a
                href="https://github.com/codeafridi/punch-macaque"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#8B949E] hover:text-[#58A6FF] transition-colors underline-offset-4 hover:underline"
              >
                View this project on GitHub
              </a>
            </div>
          </footer>
        </div>
        <a
          href="https://github.com/codeafridi/punch-macaque"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-4 right-4 z-50 rounded-full border border-[#30363D] bg-[#161B22] px-4 py-2 text-xs text-[#8B949E] hover:text-[#58A6FF] hover:border-[#58A6FF]/50 transition-colors"
        >
          GitHub: punch-macaque
        </a>
      </body>
    </html>
  )
}
