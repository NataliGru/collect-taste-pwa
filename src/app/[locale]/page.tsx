import { useTranslations } from 'next-intl';

import { Button } from '@/shared';

export default function Home() {
  const t = useTranslations();

  return (
    <div className='flex flex-row w-full justify-between gap-4 p-4 items-center'>
      Main page
      <Button>default</Button>
      <Button variant={'outline'}>outline</Button>
      <Button variant={'secondary'}>secondary</Button>
      <Button variant={'ghost'}>ghost</Button>
      <Button variant={'destructive'}>destructive</Button>
      <Button variant={'link'}>link</Button>
      <Button variant={'accent'}>accent</Button>
    </div>
  );
}
