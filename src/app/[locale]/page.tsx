import { useTranslations } from 'next-intl';

import { LocaleSwitcher } from '@/features';
import TodoList from '@/features/todo/TodoList';

export default function HomeLocalized() {
  const t = useTranslations();

  return (
    <div className='flex flex-row w-full justify-between gap-4 p-4 items-center'>
      <LocaleSwitcher />

      <h1 className='flex-1 text-center'>result: {t('home.title')}</h1>

      <TodoList />
    </div>
  );
}
