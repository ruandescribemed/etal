import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Motion } from '@/components/Motion';
import { site } from '@/data/site';
import { doto, mona } from './fonts';
import '@/styles/tokens.css';
import '@/styles/engine.css';
import '@/styles/site.css';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name}: ${site.fullName}`, template: `%s | ${site.name}` },
  description: site.description,
  alternates: { canonical: './' },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: site.name,
    locale: 'pt_BR',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: `${site.name}, ${site.theme.lines.join(' ')}: ${site.dates.label}, ${site.venue.name}` }],
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = { themeColor: '#08110a' };

// Runs before first paint: hidden-until-revealed styles only apply when JS and motion are on.
const flags = `document.documentElement.classList.add('js');if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion')`;

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: `VIII ETAL, ${site.fullName}`,
  description: site.description,
  url: site.url,
  image: [`${site.url}/og.png`],
  startDate: site.dates.start,
  endDate: site.dates.end,
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  isAccessibleForFree: true,
  inLanguage: 'pt-BR',
  location: {
    '@type': 'Place',
    name: site.venue.name,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.venue.street,
      addressLocality: site.venue.city,
      addressRegion: site.venue.region,
      postalCode: site.venue.postalCode,
      addressCountry: 'BR',
    },
    geo: { '@type': 'GeoCoordinates', latitude: site.venue.coordinates.lat, longitude: site.venue.coordinates.lng },
  },
  organizer: { '@type': 'Organization', name: 'IFRN Campus Pau dos Ferros', url: 'https://portal.ifrn.edu.br/campus/paudosferros/' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${mona.variable} ${doto.variable}`} suppressHydrationWarning>
      <head>
        {process.env.NODE_ENV === 'development' && (
          <Script
            src="//unpkg.com/react-grab/dist/index.global.js"
            crossOrigin="anonymous"
            strategy="beforeInteractive"
          />
        )}
        <script dangerouslySetInnerHTML={{ __html: flags }} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Pular para o conteúdo
        </a>
        <div id="curtain" aria-hidden="true">
          <div className="curtain__cells" />
        </div>
        <Header />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
        <Motion />
      </body>
    </html>
  );
}
