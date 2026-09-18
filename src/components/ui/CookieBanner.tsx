"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Cookie } from "lucide-react";

export default function CookieBanner() {
  const t = useTranslations("CookieBanner");
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleConsent = (status: "accepted" | "declined") => {
    localStorage.setItem("cookie_consent", status);
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 w-full z-[9999] bg-white/98 backdrop-blur-xl border-t border-gray-200 text-gray-900 shadow-[0_-10px_40px_rgba(0,0,0,0.15)]"
        >
          <div className="max-w-7xl mx-auto px-6 py-4 md:py-5 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
            {/* Left side: Icon + Text */}
            <div className="flex items-center gap-4 text-center md:text-left">
              <div className="p-3 bg-gray-100 rounded-xl text-gray-900 shrink-0 hidden sm:flex">
                <Cookie className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-anton uppercase tracking-wide text-base md:text-lg text-gray-900 mb-0.5">
                  {t("title")}
                </h3>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed font-normal max-w-2xl">
                  {t("message")}{" "}
                  <Link
                    href="/privacy"
                    className="text-black font-medium underline hover:text-gray-600 transition-colors inline-block ml-1"
                  >
                    {t("learnMore")}
                  </Link>
                </p>
              </div>
            </div>

            {/* Right side: Action Buttons */}
            <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
              <button
                onClick={() => handleConsent("accepted")}
                className="flex-1 md:flex-initial bg-black text-white font-anton uppercase text-xs md:text-sm py-3 px-6 rounded-xl hover:bg-gray-800 transition-colors cursor-pointer"
              >
                {t("accept")}
              </button>
              <button
                onClick={() => handleConsent("declined")}
                className="flex-1 md:flex-initial bg-gray-100 text-gray-700 border border-gray-300 font-anton uppercase text-xs md:text-sm py-3 px-6 rounded-xl hover:bg-gray-200 transition-colors cursor-pointer"
              >
                {t("decline")}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
