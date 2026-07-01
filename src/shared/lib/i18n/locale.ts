import { hasLocale } from 'next-intl';

import { routing } from './routing';

export type AppLocale = (typeof routing.locales)[number];

export function isAppLocale(locale: string): locale is AppLocale {
  return hasLocale(routing.locales, locale);
}
