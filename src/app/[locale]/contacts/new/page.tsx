import { Button } from '@next-template/ui/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { ContactForm } from '@/components/contacts/contact-form';
import { Link } from '@/i18n/navigation';

export const metadata: Metadata = {
  title: 'Add Contact — Contact List',
};

const NewContactPage = async () => {
  const tc = await getTranslations('contacts');

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-8">
      <Button variant="ghost" size="sm" className="mb-4" render={<Link href="/contacts" />}>
        <ArrowLeft className="size-4" aria-hidden="true" />
        {tc('backToContacts')}
      </Button>
      <h1 className="text-2xl font-semibold tracking-tight">{tc('newTitle')}</h1>
      <p className="mt-1 text-sm text-muted-foreground">{tc('newDescription')}</p>
      <div className="mt-6">
        <ContactForm mode="create" />
      </div>
    </div>
  );
};

export default NewContactPage;
