import createMiddleware from 'next-intl/middleware';

import { routing } from './shared/lib/i18n/routing';

export const proxy = createMiddleware(routing);

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
