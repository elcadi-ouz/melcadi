import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Services from "@/components/sections/services";
import Languages from "@/components/sections/languages";
import Projects from "@/components/sections/projects";
import FAQ from "@/components/sections/faq";
import SideMenu from "@/components/sections/SideMenu";
import Footer from "@/components/sections/footer";
import Contact from "@/components/sections/contact";
import { getTranslations } from "next-intl/server";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://melcadi.com';

export default async function Home({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const tFaq = await getTranslations({ locale, namespace: 'FAQ' });

  const homeJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/${locale}/#webpage`,
        "url": `${siteUrl}/${locale}`,
        "name": "Mohammed Al-Qadi | Web Developer and Digital Solutions Specialist",
        "description": "Freelance Full Stack Web Developer and Digital Product Designer based in Marrakech, Morocco.",
        "inLanguage": locale,
        "isPartOf": {
          "@id": `${siteUrl}/#website`
        }
      },
      {
        "@type": "FAQPage",
        "@id": `${siteUrl}/${locale}/#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": tFaq('q1'),
            "acceptedAnswer": {
              "@type": "Answer",
              "text": tFaq('a1')
            }
          },
          {
            "@type": "Question",
            "name": tFaq('q2'),
            "acceptedAnswer": {
              "@type": "Answer",
              "text": tFaq('a2')
            }
          },
          {
            "@type": "Question",
            "name": tFaq('q3'),
            "acceptedAnswer": {
              "@type": "Answer",
              "text": tFaq('a3')
            }
          },
          {
            "@type": "Question",
            "name": tFaq('q4'),
            "acceptedAnswer": {
              "@type": "Answer",
              "text": tFaq('a4')
            }
          }
        ]
      }
    ]
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
      <SideMenu />
      <Hero />
      <About />
      <Languages />
      <Services />
      <Projects />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}

