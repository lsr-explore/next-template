'use client';

import { Button } from '@next-template/ui/components/ui/button';
import { useTranslations } from 'next-intl';

interface GlobalErrorProps {
  error: Error;
  reset: () => void;
}

const GlobalError = ({ error, reset }: GlobalErrorProps) => {
  const te = useTranslations('errors');
  const tc = useTranslations('common');

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-16 text-center">
      <h1 className="text-2xl font-semibold">{te('somethingWentWrong')}</h1>
      <p className="mt-2 text-muted-foreground">{error.message || te('unexpectedError')}</p>
      <Button onClick={reset} variant="outline" className="mt-6">
        {tc('tryAgain')}
      </Button>
    </div>
  );
};

export default GlobalError;
