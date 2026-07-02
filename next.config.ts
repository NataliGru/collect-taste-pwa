import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

import withSerwistInit from '@serwist/next';

const withNextIntl = createNextIntlPlugin('./src/shared/lib/i18n/request.ts');

const withSerwist = withSerwistInit({
  swSrc: 'src/app/sw.ts',
  swDest: 'public/sw.js',
  cacheOnNavigation: true,
  reloadOnOnline: true,
  disable: process.env.NODE_ENV === 'development',
  additionalPrecacheEntries: [
    { url: '/en/~offline', revision: null },
    { url: '/ua/~offline', revision: null },
  ],
});

const nextConfig: NextConfig = {};

export default withSerwist(withNextIntl(nextConfig));
