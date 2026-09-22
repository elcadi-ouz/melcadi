import SideMenu from "@/components/sections/SideMenu";
import Footer from "@/components/sections/footer";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://melcadi.com';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Terms' });

  return {
    title: t('title'),
    description: t('intro'),
    alternates: {
      canonical: `/${locale}/terms`,
      languages: {
        'en': '/en/terms',
        'fr': '/fr/terms',
        'ar': '/ar/terms',
        'x-default': '/en/terms',
      },
    },
    openGraph: {
      title: `${t('title')} | Mohammad El Cadi`,
      description: t('intro'),
      url: `${siteUrl}/${locale}/terms`,
      type: 'article',
      siteName: 'Mohammad El Cadi',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${t('title')} | Mohammad El Cadi`,
      description: t('intro'),
    },
  };
}

export default async function TermsPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Terms' });

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `${siteUrl}/${locale}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": t('title'),
        "item": `${siteUrl}/${locale}/terms`
      }
    ]
  };

  return (
    <main className="bg-[#0a0a0a] text-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <SideMenu />

      <article className="max-w-[90%] md:max-w-4xl mx-auto pt-36 pb-20 font-sans leading-relaxed">
        {/* Header */}
        <header className="mb-16 border-b border-white/10 pb-8">
          <span className="text-xs uppercase tracking-[0.25em] text-gray-400 font-bold block mb-4">
            {t('lastUpdated')}
          </span>
          <h1 className="text-4xl md:text-6xl font-anton uppercase text-white tracking-tight mb-4">
            {t('title')}
          </h1>
          <p className="text-gray-400 text-lg md:text-xl font-playfair italic">
            {t('subtitle')}
          </p>
        </header>

        {/* Content sections */}
        <div className="space-y-12 text-gray-300 text-base md:text-lg">
          <section className="bg-white/5 p-6 md:p-8 rounded-2xl border border-white/10">
            <p className="leading-relaxed">{t('intro')}</p>
          </section>

          {/* Intellectual Property */}
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-anton uppercase text-white tracking-wide border-l-4 border-white pl-4">
              {t('ipTitle')}
            </h2>
            <p className="leading-relaxed">{t('ipDesc')}</p>
          </section>

          {/* Acceptable Use */}
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-anton uppercase text-white tracking-wide border-l-4 border-white pl-4">
              {t('useTitle')}
            </h2>
            <p className="leading-relaxed">{t('useDesc')}</p>
          </section>

          {/* Disclaimer */}
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-anton uppercase text-white tracking-wide border-l-4 border-white pl-4">
              {t('disclaimerTitle')}
            </h2>
            <p className="leading-relaxed">{t('disclaimerDesc')}</p>
          </section>

          {/* Governing Law */}
          <section className="space-y-4 bg-[#111] p-6 md:p-8 rounded-2xl border border-white/10">
            <h2 className="text-2xl md:text-3xl font-anton uppercase text-white tracking-wide">
              {t('lawTitle')}
            </h2>
            <p className="leading-relaxed">{t('lawDesc')}</p>
            <div className="pt-4 text-sm font-mono text-gray-400">
              <span>📍 Developer Base: Marrakech, Morocco</span>
            </div>
          </section>
        </div>
      </article>

      <Footer />
    </main>
  );
}

