'use client';

import { Button } from '@next-template/ui/components/ui/button';
import { Input } from '@next-template/ui/components/ui/input';
import { Plus, Search, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useOptimistic, useRef, useState } from 'react';
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
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const inputRef = useRef<HTMLInputElement>(null);
  const [optimisticContacts, removeOptimistic] = useOptimistic(
    contacts,
    (current, removedId: string) => current.filter((ct) => ct.id !== removedId),
  );

  const isEditor = user.role === 'editor';

  const handleSearch = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const query = searchQuery.trim();
    router.push(query ? `/contacts?q=${encodeURIComponent(query)}` : '/contacts');
  };

  const handleClear = () => {
    setSearchQuery('');
    router.push('/contacts');
    inputRef.current?.focus();
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

      <form onSubmit={handleSearch} className="flex max-w-md items-center gap-2" role="search">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            ref={inputRef}
            name="q"
            value={searchQuery}
            onChange={(ev) => setSearchQuery(ev.target.value)}
            placeholder="Search contacts..."
            className="pl-9 pr-9"
            aria-label="Search contacts"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
        <Button type="submit" size="sm">
          Search
        </Button>
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
