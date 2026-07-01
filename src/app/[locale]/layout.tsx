// eslint-disable-next-line simple-import-sort/imports
import type { Metadata, Viewport } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';

import OnlineStatus from '@/features/todo/OnlineStatus';
import { ProvidersLayout } from '@/providers';
import { cn, isAppLocale, routing } from '@/shared';

const inter = Inter({ subsets: ['latin'] });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(
  props: Omit<LayoutProps<'/[locale]'>, 'children'>,
) {
  const { locale } = await props.params;

  if (!isAppLocale(locale)) {
    notFound();
  }

  const t = await getTranslations({
    locale,
    namespace: 'home',
  });

  return {
    applicationName: t('app_name'),
    title: {
      default: t('title'),
      template: t('title_template'),
    },
    description: t('description'),
    manifest: '/manifest.webmanifest',
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: t('title'),
    },
    openGraph: {
      type: 'website',
      siteName: t('app_name'),
      title: {
        default: t('app_name'),
        template: t('title_template'),
      },
      description: t('description'),
    },
    twitter: {
      card: 'summary',
      title: {
        default: t('app_name'),
        template: t('title_template'),
      },
      description: t('description'),
    },
  };
}

export const viewport: Viewport = {
  themeColor: '#55642E',
  width: 'device-width',
  initialScale: 1,
};

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<'/[locale]'>) {
  const { locale } = await params;

  if (!isAppLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html className='h-full' lang={locale} dir='ltr'>
      <body className={cn(inter.className, 'flex h-full flex-col')}>
        <ProvidersLayout>
          <OnlineStatus />
          {children}
        </ProvidersLayout>
      </body>
    </html>
  );
}
