'use client';

import { Badge } from '@next-template/ui/components/ui/badge';
import { Button } from '@next-template/ui/components/ui/button';
import { Users } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { logoutAction } from '@/app/actions/auth-actions';
import { Link, useRouter } from '@/i18n/navigation';
import { useAuthStore } from '@/store/auth-store';
import { LanguageToggle } from './language-toggle';
import { NavLink } from './nav-link';

export const Header = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const router = useRouter();
  const tc = useTranslations('common');

  const handleLogout = async () => {
    logout();
    await logoutAction();
  };

  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Users className="size-5" aria-hidden="true" />
            <span>{tc('contacts')}</span>
          </Link>
          <nav className="flex items-center gap-1" aria-label="Main navigation">
            {isAuthenticated && <NavLink href="/contacts">{tc('contactList')}</NavLink>}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <LanguageToggle />
          {isAuthenticated && user ? (
            <>
              <div className="flex items-center gap-2 text-sm">
                <span className="hidden text-muted-foreground sm:inline">{user.name}</span>
                <Badge variant="secondary">{user.role}</Badge>
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                {tc('signOut')}
              </Button>
            </>
          ) : (
            <Button variant="ghost" size="sm" onClick={() => router.push('/login')}>
              {tc('signIn')}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
