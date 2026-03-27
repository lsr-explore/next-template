import { Button } from '@next-template/ui/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ContactForm } from '@/components/contacts/contact-form';

export const metadata: Metadata = {
  title: 'Add Contact — Contact List',
};

const NewContactPage = () => {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-8">
      <Button variant="ghost" size="sm" className="mb-4" render={<Link href="/contacts" />}>
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to contacts
      </Button>
      <h1 className="text-2xl font-semibold tracking-tight">Add contact</h1>
      <p className="mt-1 text-sm text-muted-foreground">Fill in the details for a new contact.</p>
      <div className="mt-6">
        <ContactForm mode="create" />
      </div>
    </div>
  );
};

export default NewContactPage;
