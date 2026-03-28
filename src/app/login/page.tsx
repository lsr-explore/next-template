import type { Metadata } from 'next';
import { LoginForm } from './login-form';

export const metadata: Metadata = {
  title: 'Login — Contact List',
  description: 'Sign in to manage your contacts.',
};

const LoginPage = () => {
  return (
    <div className="flex min-h-full flex-1 items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Use a preset account to explore the app.
          </p>
        </div>
        <LoginForm />
        <div className="rounded-lg border bg-muted/50 p-4 text-sm text-muted-foreground">
          <p className="font-medium text-foreground">Preset accounts</p>
          <ul className="mt-2 space-y-1">
            <li>
              <strong>Viewer:</strong> viewer@example.com / viewer123
            </li>
            <li>
              <strong>Editor:</strong> editor@example.com / editor123
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
