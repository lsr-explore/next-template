'use client';

import { Button } from '@next-template/ui/components/ui/button';
import { Input } from '@next-template/ui/components/ui/input';
import { Plus, Search } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useOptimistic, useState } from 'react';
import { deleteContactAction } from '@/app/actions/contact-actions';
import { ContactCard } from '@/components/contacts/contact-card';
import { InlineAlert } from '@/components/ui/inline-alert';
import type { User } from '@/types/auth';
import type { Contact } from '@/types/contact';

interface ContactListProps {
  contacts: Contact[];
  user: User;
  initialQuery: string;
}

export const ContactList = ({ contacts, user, initialQuery }: ContactListProps) => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [optimisticContacts, removeOptimistic] = useOptimistic(
    contacts,
    (current, removedId: string) => current.filter((ct) => ct.id !== removedId),
  );

  const isEditor = user.role === 'editor';

  const handleSearch = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const formData = new FormData(ev.currentTarget);
    const query = (formData.get('q') as string).trim();
    router.push(query ? `/contacts?q=${encodeURIComponent(query)}` : '/contacts');
  };

  const handleDelete = async (id: string) => {
    setError(null);
    removeOptimistic(id);

    const formData = new FormData();
    formData.set('id', id);
    const result = await deleteContactAction(formData);

    if (!result.success) {
      setError(result.error ?? 'Failed to delete contact.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {isEditor && (
          <Button render={<Link href="/contacts/new" />}>
            <Plus className="size-4" aria-hidden="true" />
            Add contact
          </Button>
        )}
      </div>

      <form onSubmit={handleSearch} className="relative max-w-sm" role="search">
        <Search
          className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <Input
          name="q"
          defaultValue={initialQuery}
          placeholder="Search contacts..."
          className="pl-9"
          aria-label="Search contacts"
        />
      </form>

      {error && <InlineAlert variant="error" message={error} onDismiss={() => setError(null)} />}

      {optimisticContacts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-muted-foreground">
            {initialQuery ? 'No contacts match your search.' : 'No contacts yet.'}
          </p>
          {isEditor && !initialQuery && (
            <Button variant="outline" className="mt-4" render={<Link href="/contacts/new" />}>
              Add your first contact
            </Button>
          )}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {optimisticContacts.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              isEditor={isEditor}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};
