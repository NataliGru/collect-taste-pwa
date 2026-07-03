'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

export default function Login() {
  return <AuthButton />;
}

function AuthButton() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <button disabled>Loading...</button>;
  }

  if (!session?.user) {
    return (
      <button
        className='border border-gray-500 rounded p-4 cursor-pointer hover:bg-amber-600'
        onClick={() => signIn('google')}
      >
        Sign in
      </button>
    );
  }

  return (
    <div>
      <span>{session.user.name}</span>
      <button
        className='border border-gray-500 rounded p-4 cursor-pointer hover:bg-amber-600'
        onClick={() => signOut()}
      >
        Sign out
      </button>
    </div>
  );
}
