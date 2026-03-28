'use client';

import { Input } from '@next-template/ui/components/ui/input';
import { Label } from '@next-template/ui/components/ui/label';
import { useActionState } from 'react';
import { type AuthFormState, loginAction } from '@/app/actions/auth-actions';
import { SubmitButton } from '@/components/contacts/submit-button';
import { InlineAlert } from '@/components/ui/inline-alert';

const initialState: AuthFormState = { success: false };

export const LoginForm = () => {
  const [state, formAction] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="space-y-4">
      {state.error && <InlineAlert variant="error" message={state.error} />}

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="viewer@example.com"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          placeholder="••••••••"
        />
      </div>

      <SubmitButton className="w-full">Sign in</SubmitButton>
    </form>
  );
};
