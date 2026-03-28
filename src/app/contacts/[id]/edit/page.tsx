import { Button } from '@next-template/ui/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ContactForm } from '@/components/contacts/contact-form';
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

  if (!contact) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-8">
      <Button variant="ghost" size="sm" className="mb-4" render={<Link href="/contacts" />}>
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to contacts
      </Button>
      <h1 className="text-2xl font-semibold tracking-tight">Edit contact</h1>
      <p className="mt-1 text-sm text-muted-foreground">Update the details for {contact.name}.</p>
      <div className="mt-6">
        <ContactForm mode="edit" contact={contact} />
      </div>
    </div>
  );
};

export default EditContactPage;
