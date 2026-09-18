import SideMenu from "@/components/sections/SideMenu";
import Footer from "@/components/sections/footer";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Privacy' });
  return {
    title: `${t('title')} | melcadi.com`,
    description: t('subtitle'),
    alternates: {
      canonical: `/${locale}/privacy`,
    },
  };
}

export default async function PrivacyPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Privacy' });

  return (
    <main className="bg-[#0a0a0a] text-white min-h-screen">
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

          {/* AdSense Compliance Section */}
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-anton uppercase text-white tracking-wide border-l-4 border-white pl-4">
              {t('adsenseTitle')}
            </h2>
            <p className="leading-relaxed">{t('adsenseP1')}</p>
            <p className="leading-relaxed bg-white/5 p-4 rounded-xl border border-white/10 text-gray-200">
              {t('adsenseP2')}
            </p>
          </section>

          {/* Log Files */}
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-anton uppercase text-white tracking-wide border-l-4 border-white pl-4">
              {t('logFilesTitle')}
            </h2>
            <p className="leading-relaxed">{t('logFilesDesc')}</p>
          </section>

          {/* User Data Rights */}
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-anton uppercase text-white tracking-wide border-l-4 border-white pl-4">
              {t('rightsTitle')}
            </h2>
            <p className="leading-relaxed">{t('rightsDesc')}</p>
          </section>

          {/* Contact */}
          <section className="space-y-4 bg-[#111] p-6 md:p-8 rounded-2xl border border-white/10">
            <h2 className="text-2xl md:text-3xl font-anton uppercase text-white tracking-wide">
              {t('contactTitle')}
            </h2>
            <p className="leading-relaxed">{t('contactDesc')}</p>
            <div className="pt-4 flex flex-col md:flex-row gap-4 text-sm font-mono text-gray-400">
              <span>📧 Email: <a href="mailto:elcadi.mohammad.dev@gmail.com" className="text-white underline">elcadi.mohammad.dev@gmail.com</a></span>
              <span>📞 Phone: <a href="tel:+212644334262" className="text-white underline">+212 644 334 262</a></span>
              <span>📍 Location: Marrakech, Morocco</span>
            </div>
          </section>
        </div>
      </article>

      <Footer />
    </main>
  );
}
