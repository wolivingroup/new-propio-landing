import { ThemeProvider } from '@/components/theme-provider'
import { Analytics } from '@vercel/analytics/next'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import type { Metadata } from 'next'
import type React from 'react'
import { Suspense } from 'react'
import { Toaster } from 'sonner'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Propio - Plataforma E-commerce Multitenant',
    template: '%s | Propio',
  },
  description:
    'Crea tu tienda online con Propio, la plataforma multitenant que te permite escalar tu negocio sin límites.',
  keywords: [
    'e-commerce',
    'multitenant',
    'tienda online',
    'plataforma',
    'negocio digital',
    'Propio',
  ],
  authors: [{ name: 'Propio' }],
  creator: 'Propio',
  publisher: 'Propio',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://propio.com'), // Replace with your actual domain
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://propio.com', // Replace with your actual domain
    title: 'Propio - Plataforma E-commerce Multitenant',
    description:
      'Crea tu tienda online con Propio, la plataforma multitenant que te permite escalar tu negocio sin límites.',
    siteName: 'Propio',
    images: [
      {
        url: '/placeholder.jpg', // You can replace this with a specific OG image
        width: 1200,
        height: 630,
        alt: 'Propio - Plataforma E-commerce Multitenant',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Propio - Plataforma E-commerce Multitenant',
    description:
      'Crea tu tienda online con Propio, la plataforma multitenant que te permite escalar tu negocio sin límites.',
    images: ['/placeholder.jpg'], // You can replace this with a specific Twitter image
    creator: '@propio', // Replace with your actual Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/favicon.svg',
        color: '#000000',
      },
    ],
  },
  manifest: '/site.webmanifest',
  category: 'technology',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}
      >
        <Suspense fallback={null}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster richColors position="top-right" />
          </ThemeProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
