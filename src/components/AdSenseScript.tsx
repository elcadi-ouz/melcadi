import Script from "next/script";

export default function AdSenseScript() {
  const pubId = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID || "ca-pub-4483345920198459";

  return (
    <Script
      id="adsense-init"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pubId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
