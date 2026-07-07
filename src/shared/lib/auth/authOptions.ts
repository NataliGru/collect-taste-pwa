import type { AuthOptions } from 'next-auth';
import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

import { PrismaAdapter } from '@next-auth/prisma-adapter';

import { prisma } from '@/shared/lib/prisma';

const googleClientId = process.env.AUTH_GOOGLE_ID;
const googleClientSecret = process.env.AUTH_GOOGLE_SECRET;

if (!googleClientId || !googleClientSecret) {
  throw new Error('Missing Google OAuth environment variables');
}

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),

  session: {
    strategy: 'database',
    maxAge: 30 * 24 * 60 * 60, // 30 днів
    updateAge: 24 * 60 * 60, // оновлювати сесію раз на 24 год
  },

  providers: [
    Google({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    }),
  ],

  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }

      return session;
    },
  },
};

export const authHandler = NextAuth(authOptions);
