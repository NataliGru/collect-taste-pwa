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

// const APP_NAME = 'PWA App';
// const APP_DEFAULT_TITLE = 'My Awesome PWA App';
// const APP_TITLE_TEMPLATE = '%s - PWA App';
// const APP_DESCRIPTION = 'Best PWA app in the world!';

// export const metadata: Metadata = {
//   applicationName: APP_NAME,
//   title: {
//     default: APP_DEFAULT_TITLE,
//     template: APP_TITLE_TEMPLATE,
//   },
//   description: APP_DESCRIPTION,
//   appleWebApp: {
//     capable: true,
//     statusBarStyle: 'default',
//     title: APP_DEFAULT_TITLE,
//     // startUpImage: [],
//   },
//   formatDetection: {
//     telephone: false,
//   },
//   openGraph: {
//     type: 'website',
//     siteName: APP_NAME,
//     title: {
//       default: APP_DEFAULT_TITLE,
//       template: APP_TITLE_TEMPLATE,
//     },
//     description: APP_DESCRIPTION,
//   },
//   twitter: {
//     card: 'summary',
//     title: {
//       default: APP_DEFAULT_TITLE,
//       template: APP_TITLE_TEMPLATE,
//     },
//     description: APP_DESCRIPTION,
//   },
// };

export async function generateMetadata(
  props: Omit<LayoutProps<'/[locale]'>, 'children'>,
) {
  const { locale } = await props.params;

  if (!isAppLocale(locale)) {
    notFound();
  }

  const t = await getTranslations({
    locale,
    namespace: 'LocaleLayout',
  });

  return {
    title: t('title'),
    description: 'A Next.js PWA that works completely offline',
    manifest: '/manifest.webmanifest',
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: 'Offline Todos',
    },
  };
}

export const viewport: Viewport = {
  themeColor: '#3b82f6',
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
