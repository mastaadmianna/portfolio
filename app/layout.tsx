import type { Metadata } from 'next'
import { DM_Serif_Display, Inter } from 'next/font/google'
import './globals.css'
import SmoothScroll from '@/components/ui/SmoothScroll'
import DiagonalHatch from '@/components/ui/DiagonalHatch'
import CursorFollower from '@/components/ui/CursorFollower'

const dmSerif = DM_Serif_Display({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Alex Chen — Product Designer',
  description:
    'Senior product designer specializing in fintech, SaaS, and healthcare. Currently at Stripe. Previously Airbnb, Google.',
  keywords: ['product designer', 'UX designer', 'portfolio', 'fintech', 'design systems'],
  authors: [{ name: 'Alex Chen' }],
  openGraph: {
    title: 'Alex Chen — Product Designer',
    description:
      'Senior product designer specializing in fintech, SaaS, and healthcare.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${dmSerif.variable} ${inter.variable}`}>
      <body>
        <DiagonalHatch />
        <div style={{ position: 'relative', zIndex: 1, width: '100%' }}>
          <SmoothScroll>{children}</SmoothScroll>
        </div>
        <CursorFollower />
      </body>
    </html>
  )
}
