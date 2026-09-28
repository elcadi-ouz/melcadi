import dynamic from "next/dynamic";
import Hero from "@/components/sections/hero";
import SideMenu from "@/components/sections/SideMenu";

const About = dynamic(() => import("@/components/sections/about"), { ssr: true });
const Services = dynamic(() => import("@/components/sections/services"), { ssr: true });
const Languages = dynamic(() => import("@/components/sections/languages"), { ssr: true });
const Projects = dynamic(() => import("@/components/sections/projects"), { ssr: true });
const FAQ = dynamic(() => import("@/components/sections/faq"), { ssr: true });
const Contact = dynamic(() => import("@/components/sections/contact"), { ssr: true });
const Footer = dynamic(() => import("@/components/sections/footer"), { ssr: true });
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
        "name": "Mohammed EL Cadi | Web Developer and Digital Solutions Specialist",
        "description": "Freelance Full Stack Web Developer and Digital Solutions Specialist based in Morocco.",
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

