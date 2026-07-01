import { ReactNode } from 'react';

import { NextIntlClientProvider } from 'next-intl';

type Props = {
  children: ReactNode;
};

export function ProvidersLayout({ children }: Props) {
  return <NextIntlClientProvider>{children}</NextIntlClientProvider>;
}
