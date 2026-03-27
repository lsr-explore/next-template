'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/auth-store';
import type { User } from '@/types/auth';

interface AuthSyncProps {
  user: User;
}

export const AuthSync = ({ user }: AuthSyncProps) => {
  const { login, user: currentUser } = useAuthStore();

  useEffect(() => {
    if (!currentUser || currentUser.id !== user.id) {
      login(user);
    }
  }, [user, currentUser, login]);

  return null;
};
