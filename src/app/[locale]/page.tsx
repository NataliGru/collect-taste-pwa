import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations();

  return (
    <div className='flex flex-row w-full justify-between gap-4 p-4 items-center'>
      Main page
    </div>
  );
}
