import { getTranslations } from 'next-intl/server';
import { AuthSync } from '@/components/auth/auth-sync';
import { getSession } from '@/lib/auth-session';
import { getAllContacts, searchContacts } from '@/lib/contact-store';
import type { User } from '@/types/auth';
import { ContactList } from './contact-list';

interface ContactsPageProps {
  searchParams: Promise<{ q?: string }>;
}

const ContactsPage = async ({ searchParams }: ContactsPageProps) => {
  const { q: query } = await searchParams;
  const user = (await getSession()) as User;
  const contacts = query ? searchContacts(query) : getAllContacts();
  const tc = await getTranslations('contacts');

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8">
      <AuthSync user={user} />
      <h1 className="text-2xl font-semibold tracking-tight">{tc('title')}</h1>
      <ContactList contacts={contacts} user={user} initialQuery={query ?? ''} />
    </div>
  );
};

export default ContactsPage;
