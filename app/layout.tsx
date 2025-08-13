import type { Metadata } from 'next'
import { Public_Sans } from 'next/font/google'
import './globals.css'

const publicSans = Public_Sans({ 
  subsets: ['latin'],
  variable: '--font-public-sans',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://gardeniashealthcare.com'),
  title: 'Gardenias Healthcare - Professional Massage Therapy Clinic',
  description: 'Experience the healing touch of professional massage therapy at Gardenias Healthcare. Our skilled therapists provide therapeutic massage services to promote wellness and relaxation.',
  keywords: 'massage therapy, healthcare, wellness, therapeutic massage, relaxation, Gardenias Healthcare',
  authors: [{ name: 'Gardenias Healthcare' }],
  openGraph: {
    title: 'Gardenias Healthcare - Professional Massage Therapy Clinic',
    description: 'Experience the healing touch of professional massage therapy at Gardenias Healthcare.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${publicSans.variable} font-public-sans`}>
        {children}
      </body>
    </html>
  )
}
