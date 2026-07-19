import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

import { Inter, Playfair_Display, Anton, Geist } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";
import Magnetic from "@/components/sections/Magnetic";
import { FaInstagram, FaLinkedin, FaWhatsapp, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import type { Metadata } from "next";
import Preloader from "@/components/ui/Preloader";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://melcadi.com/#person",
      "name": "Mohammad El Cadi",
      "url": "https://melcadi.com",
      "jobTitle": "Full Stack Web Developer & Digital Product Designer",
      "description": "I design and develop premium digital products that build ultimate trust and accelerate client growth.",
      "image": "https://melcadi.com/profile.jpg",
      "knowsAbout": [
        "Web Development",
        "React",
        "Next.js",
        "TypeScript",
        "Digital Product Design",
        "UI/UX Design",
        "SEO Optimization"
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
      "@id": "https://melcadi.com/#service",
      "name": "Mohammad El Cadi - Freelance Web Developer",
      "url": "https://melcadi.com",
      "logo": "https://melcadi.com/logo.png",
      "image": "https://melcadi.com/profile.jpg",
      "description": "Freelance web development and digital design services based in marrakech, Morocco. Specializing in high-performance websites and web applications.",
      "telephone": "+212644334262",
      "email": "mohammad.elcadi.dev@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "marrakech",
        "addressRegion": "Souss-Massa",
        "addressCountry": "MA"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "30.427755",
        "longitude": "-9.598107"
      },
      "areaServed": [
        "marrakech",
        "Morocco",
        "Worldwide"
      ],
      "priceRange": "$$",
      "founder": {
        "@id": "https://melcadi.com/#person"
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://melcadi.com/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Do you work with international clients?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, I work with clients worldwide as a freelance Full Stack Developer. I have experience collaborating with teams and businesses across different time zones."
          }
        },
        {
          "@type": "Question",
          "name": "What technologies do you specialize in?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "My primary stack includes React, Next.js, TypeScript, Tailwind CSS, and Node.js. I also specialize in WebGL and 3D experiences using Three.js."
          }
        },
        {
          "@type": "Question",
          "name": "Do you handle both design and development?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely. I provide end-to-end solutions, starting from UI/UX design in Figma to fully responsive and performant frontend and backend development."
          }
        },
        {
          "@type": "Question",
          "name": "How do you ensure the websites are fast and SEO optimized?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "I utilize Next.js Server-Side Rendering (SSR), strict Core Web Vitals optimization, lazy loading, and Generative Engine Optimization (GEO) strategies to ensure high rankings and performance."
          }
        }
      ]
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
      template: '%s',
      default: t('title'),
    },
    description: t('description'),
    keywords: t('keywords'),
    authors: [{ name: 'Mohammad El Cadi', url: 'https://melcadi.com' }],
    creator: 'Mohammad El Cadi',
    metadataBase: new URL('https://melcadi.com'), // Replace with your actual domain when deployed
    alternates: {
      canonical: '/',
      languages: {
        'en': '/en',
        'fr': '/fr',
        'ar': '/ar',
      },
    },
    openGraph: {
      type: 'website',
      locale: locale,
      url: 'https://melcadi.com',
      title: t('title'),
      description: t('description'),
      siteName: 'Mohammad El Cadi',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      creator: '@elcadi_mohammad',
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
      google: 'ADD_YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE', 
      yandex: 'ADD_YOUR_YANDEX_VERIFICATION_CODE', 
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

  return (
    <html
      lang={locale}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className={cn("h-full", "antialiased", "scroll-smooth", inter.variable, playfair.variable, anton.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col">
        {/* JSON-LD Structured Data for Local SEO & Branding */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <NextIntlClientProvider messages={messages}>
          <Preloader />
          {children}

          <div className="fixed bottom-1 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] flex items-center justify-center gap-6 mix-blend-difference [&_svg]:w-10 [&_svg]:h-10 [&_svg]:fill-white cursor-pointer">
            <Magnetic>
              <a href="https://www.instagram.com/mohammadelcadi" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="https://x.com/elcadi_mohammad" target="_blank" rel="noopener noreferrer">
                <FaXTwitter />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="https://www.linkedin.com/in/mohammadelcadi" target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="https://wa.me/212644334262" target="_blank" rel="noopener noreferrer">
                <FaWhatsapp />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="https://github.com/elcadii" target="_blank" rel="noopener noreferrer">
                <FaGithub />
              </a>
            </Magnetic>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
