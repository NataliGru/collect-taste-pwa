'use client';

import { ChangeEvent, ReactNode, useTransition } from 'react';

import { Locale } from 'next-intl';
import { useParams } from 'next/navigation';

import clsx from 'clsx';

import { usePathname, useRouter } from '@/shared';

type Props = {
  children: ReactNode;
  defaultValue: string;
  label: string;
};

export function LocaleSwitcherSelect({ children, defaultValue, label }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as Locale;

    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale },
      );
    });
  }

  return (
    <label
      className={clsx(
        'relative flex-1 rounded-xl border-[0.5] border-gray-700 text-gray-400',
        isPending && 'opacity-30 transition-opacity',
      )}
    >
      <p className='sr-only'>{label}</p>
      <select
        className='inline-flex w-full appearance-none rounded-xl bg-transparent py-3 pl-2 pr-6'
        defaultValue={defaultValue}
        disabled={isPending}
        onChange={onSelectChange}
      >
        {children}
      </select>
      <span
        aria-hidden='true'
        className='pointer-events-none absolute right-2 top-[8px]'
      >
        v
      </span>
    </label>
  );
}
