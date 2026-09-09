import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// Il plugin collega ./i18n/request.ts (config per-richiesta) alla build.
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {};

export default withNextIntl(nextConfig);
