'use client';

export default function OfflinePage() {
  return (
    <main className='flex min-h-dvh flex-col items-center justify-center px-6 text-center'>
      <h1 className='text-2xl font-semibold'>Ти офлайн</h1>

      <p className='mt-3 max-w-sm text-sm text-muted-foreground'>
        Зараз немає інтернету. Підключись до мережі й спробуй ще раз.
      </p>

      <button
        className='mt-6 rounded-xl border px-4 py-2 text-sm'
        onClick={() => window.location.reload()}
      >
        Спробувати ще раз
      </button>
    </main>
  );
}
