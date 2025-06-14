import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Abuja Property Verification Platform',
  description: 'Instant and secure property document verification service in Abuja. Verify land documents, reduce fraud, and make informed decisions.',
  keywords: 'property verification, Abuja land, document checks, secure verification, real estate Abuja',
  authors: [{ name: 'Imgholder' }],
  openGraph: {
    title: 'Abuja Property Verification Platform',
    description: 'Instant and secure document verification for properties in Abuja.',
    type: 'website',
    locale: 'en_NG',
    siteName: 'Abuja Property Verify',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abuja Property Verification',
    description: 'Secure land document checks and property authentication in Abuja',
  },
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}