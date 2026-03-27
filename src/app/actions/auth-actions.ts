'use server';

import { redirect } from 'next/navigation';
import { clearSession, setSession } from '@/lib/auth-session';
import { PRESET_USERS } from '@/types/auth';

export interface AuthFormState {
  success: boolean;
  error?: string;
}

export const loginAction = async (
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> => {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { success: false, error: 'Email and password are required.' };
  }

  const account = Object.values(PRESET_USERS).find(
    (preset) => preset.email === email && preset.password === password,
  );

  if (!account) {
    return { success: false, error: 'Invalid email or password.' };
  }

  await setSession(account.user);

  redirect('/contacts');
};

export const logoutAction = async (): Promise<void> => {
  await clearSession();
  redirect('/login');
};
