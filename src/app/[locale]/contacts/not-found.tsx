import { Button } from '@next-template/ui/components/ui/button';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

const ContactsNotFound = async () => {
  const te = await getTranslations('errors');
  const tc = await getTranslations('contacts');

  return (
    <div className="mx-auto flex max-w-5xl flex-col items-center justify-center px-4 py-16 text-center">
      <h1 className="text-2xl font-semibold">{te('somethingWentWrong')}</h1>
      <p className="mt-2 text-muted-foreground">{te('contactNotFound')}</p>
      <Button variant="outline" className="mt-6" render={<Link href="/contacts" />}>
        {tc('backToContacts')}
      </Button>
    </div>
  );
};

export default ContactsNotFound;
