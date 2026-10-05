import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SEO Website Analyzer | Free SEO Report — Pytron Digital',
  description:
    'Get a clear, actionable SEO health report in seconds. Identify critical technical issues, on-page opportunities, Core Web Vitals, and mobile readiness for digital.pytron.io.',
  keywords: [
    'SEO Analyzer',
    'Free SEO Report',
    'Website SEO Audit',
    'Technical SEO',
    'Core Web Vitals',
    'Pytron Digital',
    'Search Engine Optimization',
    'Organic Traffic',
  ],
  authors: [{ name: 'Pytron Digital', url: 'https://digital.pytron.io' }],
  creator: 'Pytron Digital',
  publisher: 'Pytron Digital',
  metadataBase: new URL('https://digital.pytron.io'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'SEO Website Analyzer | Free SEO Report — Pytron Digital',
    description:
      'Analyze your website for technical SEO, performance, on-page factors, and search readiness. Instant, actionable results.',
    url: 'https://digital.pytron.io',
    siteName: 'Pytron Digital SEO Intelligence',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SEO Website Analyzer | Pytron Digital',
    description: 'See what is holding your website back in organic search rankings with instant SEO intelligence.',
    creator: '@PytronDigital',
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
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#3451E8',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-brand-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
