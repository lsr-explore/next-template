import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { LoginForm } from './login-form';

export const metadata: Metadata = {
  title: 'Login — Contact List',
  description: 'Sign in to manage your contacts.',
};

const LoginPage = async () => {
  const tl = await getTranslations('login');

  return (
    <div className="flex min-h-full flex-1 items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-semibold tracking-tight">{tl('title')}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{tl('subtitle')}</p>
        </div>
        <LoginForm />
        <div className="rounded-lg border bg-muted/50 p-4 text-sm text-muted-foreground">
          <p className="font-medium text-foreground">{tl('presetAccounts')}</p>
          <ul className="mt-2 space-y-1">
            <li>
              <strong>{tl('viewer')}:</strong> viewer@example.com / ContactsViewer123
            </li>
            <li>
              <strong>{tl('editor')}:</strong> editor@example.com / ContactsEditor123
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
