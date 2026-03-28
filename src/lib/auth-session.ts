import 'server-only';
import { cookies } from 'next/headers';
import type { User } from '@/types/auth';

const AUTH_COOKIE = 'auth-session';

export const getSession = async (): Promise<User | null> => {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(AUTH_COOKIE);
  if (!sessionCookie?.value) {
    return null;
  }

  try {
    return JSON.parse(sessionCookie.value) as User;
  } catch {
    return null;
  }
};

export const setSession = async (user: User): Promise<void> => {
  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE, JSON.stringify(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24, // 24 hours
  });
};

export const clearSession = async (): Promise<void> => {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE);
};

export const requireAuth = async (): Promise<User> => {
  const user = await getSession();
  if (!user) {
    throw new Error('Authentication required');
  }
  return user;
};

export const requireEditor = async (): Promise<User> => {
  const user = await requireAuth();
  if (user.role !== 'editor') {
    throw new Error('Editor access required');
  }
  return user;
};
