import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// Il plugin collega ./i18n/request.ts (config per-richiesta) alla build.
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Prima dell'i18n l'immagine OG stava alla radice; con [locale] vive in
      // /it/opengraph-image e /en/opengraph-image. Le cache dei servizi di
      // anteprima (Google, Chrome, WhatsApp) tenevano il vecchio URL, lo
      // trovavano in 404 e ripiegavano su una foto qualsiasi della pagina.
      { source: "/opengraph-image", destination: "/it/opengraph-image", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
