import { Button } from '@next-template/ui/components/ui/button';
import Link from 'next/link';

const ContactsNotFound = () => {
  return (
    <div className="mx-auto flex max-w-5xl flex-col items-center justify-center px-4 py-16 text-center">
      <h1 className="text-2xl font-semibold">Not found</h1>
      <p className="mt-2 text-muted-foreground">
        The contact you&apos;re looking for doesn&apos;t exist.
      </p>
      <Button variant="outline" className="mt-6" render={<Link href="/contacts" />}>
        Back to contacts
      </Button>
    </div>
  );
};

export default ContactsNotFound;
