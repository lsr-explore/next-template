'use client';

import { Button } from '@next-template/ui/components/ui/button';

interface GlobalErrorProps {
  error: Error;
  reset: () => void;
}

const GlobalError = ({ error, reset }: GlobalErrorProps) => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-16 text-center">
      <h1 className="text-2xl font-semibold">Something went wrong</h1>
      <p className="mt-2 text-muted-foreground">
        {error.message || 'An unexpected error occurred.'}
      </p>
      <Button onClick={reset} variant="outline" className="mt-6">
        Try again
      </Button>
    </div>
  );
};

export default GlobalError;
