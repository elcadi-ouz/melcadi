import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

import { Inter, Playfair_Display, Anton, Geist } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";
import Magnetic from "@/components/sections/Magnetic";
import { FaInstagram, FaLinkedin, FaWhatsapp, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import type { Metadata } from "next";

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

export const metadata: Metadata = {
  title: "Hero Portfolio",
  description: "Digital Product Designer Portfolio",
};

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
        <NextIntlClientProvider messages={messages}>
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
