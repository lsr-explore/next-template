'use client';

import { Button } from '@next-template/ui/components/ui/button';
import { useTranslations } from 'next-intl';

interface ContactsErrorProps {
  error: Error;
  reset: () => void;
}

const ContactsError = ({ error, reset }: ContactsErrorProps) => {
  const te = useTranslations('errors');
  const tc = useTranslations('common');

  return (
    <div className="mx-auto flex max-w-5xl flex-col items-center justify-center px-4 py-16 text-center">
      <h1 className="text-2xl font-semibold">{te('somethingWentWrong')}</h1>
      <p className="mt-2 text-muted-foreground">{error.message || te('failedToLoadContacts')}</p>
      <Button onClick={reset} variant="outline" className="mt-6">
        {tc('tryAgain')}
      </Button>
    </div>
  );
};

export default ContactsError;
