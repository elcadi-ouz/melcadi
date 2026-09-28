"use client";

import dynamic from "next/dynamic";

const Preloader = dynamic(() => import("@/components/ui/Preloader"), { ssr: false });

export default function PreloaderWrapper() {
  return <Preloader />;
}
