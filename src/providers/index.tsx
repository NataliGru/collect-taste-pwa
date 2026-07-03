import { ReactNode } from 'react';

import { NextIntlClientProvider } from 'next-intl';

import { AuthProvider } from './authProvider';

type Props = {
  children: ReactNode;
};

export function ProvidersLayout({ children }: Props) {
  return (
    <NextIntlClientProvider>
      <AuthProvider>{children}</AuthProvider>
    </NextIntlClientProvider>
  );
}
