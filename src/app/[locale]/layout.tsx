import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { routing } from '@/i18n/routing';

import { Inter, Playfair_Display, Anton, Geist } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";
import Magnetic from "@/components/sections/Magnetic";
import { FaInstagram, FaLinkedin, FaWhatsapp, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import type { Metadata } from "next";
import Preloader from "@/components/ui/Preloader";
import CookieBanner from "@/components/ui/CookieBanner";
import AdSenseScript from "@/components/AdSenseScript";
import Analytics from "@/components/Analytics";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://melcadi.com';

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      "url": siteUrl,
      "name": "Mohammad El Cadi",
      "description": "Full Stack Web Developer & Digital Product Designer based in Marrakech, Morocco.",
      "publisher": {
        "@id": `${siteUrl}/#person`
      },
      "inLanguage": ["en", "fr", "ar"]
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      "name": "Mohammad El Cadi",
      "url": siteUrl,
      "jobTitle": "Full Stack Web Developer & Digital Product Designer",
      "description": "I design and develop premium digital products that build ultimate trust and accelerate client growth.",
      "image": `${siteUrl}/heroimage.png`,
      "knowsAbout": [
        "Web Development",
        "React",
        "Next.js",
        "TypeScript",
        "Digital Product Design",
        "UI/UX Design",
        "SEO Optimization",
        "WebGL",
        "Node.js"
      ],
      "sameAs": [
        "https://github.com/elcadii",
        "https://www.linkedin.com/in/mohammadelcadi",
        "https://x.com/elcadi_mohammad",
        "https://www.instagram.com/mohammadelcadi"
      ]
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#service`,
      "name": "Mohammad El Cadi - Freelance Web Developer",
      "url": siteUrl,
      "logo": `${siteUrl}/melcadi-icon.png`,
      "image": `${siteUrl}/heroimage.png`,
      "description": "Freelance web development and digital design services based in Marrakech, Morocco. Specializing in high-performance websites, Next.js web applications, and digital products.",
      "telephone": "+212644334262",
      "email": "elcadi.mohammad.dev@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Marrakech",
        "addressRegion": "Marrakech-Safi",
        "addressCountry": "MA"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "31.6295",
        "longitude": "-7.9811"
      },
      "areaServed": [
        "Marrakech",
        "Morocco",
        "Worldwide"
      ],
      "priceRange": "$$",
      "founder": {
        "@id": `${siteUrl}/#person`
      }
    }
  ]
};

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
});

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: {
      template: '%s | Mohammad El Cadi',
      default: t('title'),
    },
    description: t('description'),
    keywords: t('keywords'),
    authors: [{ name: 'Mohammad El Cadi', url: siteUrl }],
    creator: 'Mohammad El Cadi',
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'en': '/en',
        'fr': '/fr',
        'ar': '/ar',
        'x-default': '/en',
      },
    },
    openGraph: {
      type: 'website',
      locale: locale,
      url: `${siteUrl}/${locale}`,
      title: t('title'),
      description: t('description'),
      siteName: 'Mohammad El Cadi',
      images: [
        {
          url: `${siteUrl}/heroimage.png`,
          width: 1200,
          height: 630,
          alt: 'Mohammad El Cadi — Full Stack Web Developer & Digital Product Designer',
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      creator: '@elcadi_mohammad',
      images: [`${siteUrl}/heroimage.png`],
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
    verification: {
      google: process.env.NEXT_PUBLIC_GSC_VERIFICATION || '6n7tC4xqH5BdBYZbXQfNRSXYo_tB_XBWFtYwxUCR8OQ',
    },
    other: {
      'google-adsense-account': 'ca-pub-4483345920198459',
    },
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-M5CD6Z76';

  return (
    <html
      lang={locale}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className={cn("h-full", "antialiased", "scroll-smooth", inter.variable, playfair.variable, anton.variable, "font-sans", geist.variable)}
    >
      <head>
        <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GSC_VERIFICATION || '6n7tC4xqH5BdBYZbXQfNRSXYo_tB_XBWFtYwxUCR8OQ'} />
        <meta name="google-adsense-account" content="ca-pub-4483345920198459" />
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4483345920198459"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full flex flex-col">
        {/* Google Tag Manager (noscript) */}
        {gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        {/* JSON-LD Structured Data for Global SEO, Branding & Entity Understanding */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <NextIntlClientProvider messages={messages}>
          <Analytics />
          <AdSenseScript />
          <Preloader />
          {children}
          <CookieBanner />

          <nav aria-label="Social links" className="fixed bottom-1 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] flex items-center justify-center gap-6 mix-blend-difference [&_svg]:w-10 [&_svg]:h-10 [&_svg]:fill-white cursor-pointer">
            <Magnetic>
              <a href="https://www.instagram.com/mohammadelcadi" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="https://x.com/elcadi_mohammad" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FaXTwitter />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="https://www.linkedin.com/in/mohammadelcadi" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedin />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="https://wa.me/212644334262" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <FaWhatsapp />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="https://github.com/elcadii" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <FaGithub />
              </a>
            </Magnetic>
          </nav>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

