'use client';

import { Button } from '@next-template/ui/components/ui/button';
import { cn } from '@next-template/ui/lib/utils';
import { Loader2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';

interface SubmitButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'destructive';
}

export const SubmitButton = ({ children, className, variant = 'default' }: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" variant={variant} disabled={pending} className={cn(className)}>
      {pending && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
      {children}
    </Button>
  );
};
