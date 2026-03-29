import { Button } from '@next-template/ui/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { ContactForm } from '@/components/contacts/contact-form';
import { Link } from '@/i18n/navigation';
import { getContactById } from '@/lib/contact-store';

export const metadata: Metadata = {
  title: 'Edit Contact — Contact List',
};

interface EditContactPageProps {
  params: Promise<{ id: string }>;
}

const EditContactPage = async ({ params }: EditContactPageProps) => {
  const { id } = await params;
  const contact = getContactById(id);
  const tc = await getTranslations('contacts');

  if (!contact) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-8">
      <Button variant="ghost" size="sm" className="mb-4" render={<Link href="/contacts" />}>
        <ArrowLeft className="size-4" aria-hidden="true" />
        {tc('backToContacts')}
      </Button>
      <h1 className="text-2xl font-semibold tracking-tight">{tc('editTitle')}</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {tc('editDescription', { name: contact.name })}
      </p>
      <div className="mt-6">
        <ContactForm mode="edit" contact={contact} />
      </div>
    </div>
  );
};

export default EditContactPage;
