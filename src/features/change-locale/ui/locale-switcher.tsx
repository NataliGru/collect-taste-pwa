import { useLocale, useTranslations } from 'next-intl';

import { routing } from '@/shared';

import { LocaleSwitcherSelect } from './locale-switcher-select';

export function LocaleSwitcher() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <LocaleSwitcherSelect defaultValue={locale} label={t('locale.label')}>
      {routing.locales.map((cur) => (
        <option key={cur} value={cur} className='rounded-xl'>
          {t(`locale.${cur}`)}
        </option>
      ))}
    </LocaleSwitcherSelect>
  );
}
