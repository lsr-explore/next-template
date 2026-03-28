'use client';

import { Button } from '@next-template/ui/components/ui/button';

interface ContactsErrorProps {
  error: Error;
  reset: () => void;
}

const ContactsError = ({ error, reset }: ContactsErrorProps) => {
  return (
    <div className="mx-auto flex max-w-5xl flex-col items-center justify-center px-4 py-16 text-center">
      <h1 className="text-2xl font-semibold">Something went wrong</h1>
      <p className="mt-2 text-muted-foreground">{error.message || 'Failed to load contacts.'}</p>
      <Button onClick={reset} variant="outline" className="mt-6">
        Try again
      </Button>
    </div>
  );
};

export default ContactsError;
