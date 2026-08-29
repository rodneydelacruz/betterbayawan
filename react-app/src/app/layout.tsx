import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import HotlineBar from '@/components/layout/HotlineBar';
import Header from '@/components/layout/Header';
import InfoBar from '@/components/layout/InfoBar';
import Footer from '@/components/layout/Footer';
import PWAManager from '@/components/PWAManager';
import { LanguageProvider } from '@/contexts/LanguageContext';

export const viewport: Viewport = {
  themeColor: '#0032a0',
};

export const metadata: Metadata = {
  title: { default: 'BetterBayawan.org | Civic Portal', template: '%s | BetterBayawan.org' },
  description: 'BetterBayawan.org - Civic portal for Bayawan City services.',
  keywords: ['BetterBayawan', 'Bayawan City Negros Oriental', 'LGU Bayawan City', 'City services'],
  authors: [{ name: 'Ramon Logan Jr.' }],
  openGraph: {
    type: 'website',
    locale: 'en_PH',
    url: 'https://BetterBayawan.org/',
    siteName: 'BetterBayawan.org',
    title: 'BetterBayawan.org | Civic Portal',
    description: 'Empowering the people of Bayawan City with transparent access to services.',
    images: [
      {
        url: 'https://BetterBayawan.org/assets/images/banners/opengraph.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: { card: 'summary_large_image' },
  icons: {
    icon: [{ url: '/assets/images/logo/better-bayawan-icon-white.png', type: 'image/png', sizes: '1254x1254' }],
    apple: '/assets/images/logo/better-bayawan-icon-white.png',
  },
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'BetterBayawan',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Great+Vibes&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css"
        />
        <link rel="stylesheet" href="/assets/css/style.css" />
        <link rel="stylesheet" href="/assets/css/responsive.css" />
        <link rel="stylesheet" href="/assets/css/accessibility.css" />
        <link rel="stylesheet" href="/assets/css/footer.css" />
      </head>
      <body>
        <LanguageProvider>
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          <HotlineBar />
          <Header />
          <InfoBar />
          <main id="main-content">{children}</main>
          <Footer />
          <PWAManager />
        </LanguageProvider>
        <Script
          src="https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
