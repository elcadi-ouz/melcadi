import Link from 'next/link';
import type { Metadata } from 'next';
import SideMenu from '@/components/sections/SideMenu';
import Footer from '@/components/sections/footer';

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist or has been moved.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <main className="bg-[#0a0a0a] text-white min-h-screen flex flex-col justify-between">
      <SideMenu />
      
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-36 text-center max-w-3xl mx-auto">
        <span className="text-xs uppercase tracking-[0.3em] text-gray-400 font-bold block mb-4">
          Error 404
        </span>
        <h1 className="text-6xl md:text-9xl font-anton uppercase text-white tracking-tight mb-6">
          Page Not Found
        </h1>
        <p className="text-gray-400 text-lg md:text-2xl font-playfair italic mb-12 max-w-xl">
          The requested page could not be located. Explore our site using the navigation links below.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 font-inter text-sm font-semibold uppercase tracking-widest">
          <Link
            href="/"
            className="px-8 py-4 bg-white text-black hover:bg-gray-200 transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/#services"
            className="px-8 py-4 border border-white/20 text-white hover:border-white transition-colors"
          >
            Our Services
          </Link>
          <Link
            href="/#projects"
            className="px-8 py-4 border border-white/20 text-white hover:border-white transition-colors"
          >
            Featured Work
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
