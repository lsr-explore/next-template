import { Button } from '@next-template/ui/components/ui/button';
import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-16 text-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mt-2 text-lg text-muted-foreground">Page not found</p>
      <Button variant="outline" className="mt-6" render={<Link href="/" />}>
        Go home
      </Button>
    </div>
  );
};

export default NotFound;
