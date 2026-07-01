import { getRequestConfig } from 'next-intl/server';

import enMessages from '@/localization/en';
import uaMessages from '@/localization/ua';

import { routing } from './routing';

type Locale = (typeof routing.locales)[number];

const messages = {
  en: enMessages,
  ua: uaMessages,
};

function isLocale(locale: string | undefined): locale is Locale {
  return routing.locales.includes(locale as Locale);
}

export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment

  const locale = await requestLocale;
  const safeLocale = isLocale(locale) ? locale : routing.defaultLocale;

  return {
    locale: safeLocale,
    messages: messages[safeLocale],
  };
});
