'use client';

import { Input } from '@next-template/ui/components/ui/input';
import { Label } from '@next-template/ui/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';
import { useActionState, useState } from 'react';
import { type AuthFormState, loginAction } from '@/app/actions/auth-actions';
import { SubmitButton } from '@/components/contacts/submit-button';
import { InlineAlert } from '@/components/ui/inline-alert';

const initialState: AuthFormState = { success: false };

export const LoginForm = () => {
  const [state, formAction] = useActionState(loginAction, initialState);
  const [showPassword, setShowPassword] = useState(false);

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
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            required
            placeholder="••••••••"
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
      </div>

      <SubmitButton className="w-full">Sign in</SubmitButton>
    </form>
  );
};
