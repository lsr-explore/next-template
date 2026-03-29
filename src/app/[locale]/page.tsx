import { Button } from '@next-template/ui/components/ui/button';
import { Search, Shield, Users } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

const HomePage = async () => {
  const tc = await getTranslations('common');
  const th = await getTranslations('home');

  const features = [
    {
      icon: Users,
      title: th('features.contactManagement.title'),
      description: th('features.contactManagement.description'),
    },
    {
      icon: Shield,
      title: th('features.roleBasedAccess.title'),
      description: th('features.roleBasedAccess.description'),
    },
    {
      icon: Search,
      title: th('features.searchFilter.title'),
      description: th('features.searchFilter.description'),
    },
  ];

  return (
    <div className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="flex flex-1 flex-col items-center justify-center px-4 py-16 text-center">
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">{th('title')}</h1>
        <p className="mt-4 max-w-lg text-lg text-muted-foreground">{th('description')}</p>
        <div className="mt-8 flex gap-3">
          <Button render={<Link href="/login" />}>{tc('signIn')}</Button>
          <Button variant="outline" render={<Link href="/contacts" />}>
            {th('viewContacts')}
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="border-t bg-muted/30 px-4 py-16">
        <div className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="mx-auto mb-3 flex size-10 items-center justify-center rounded-lg bg-primary/10">
                <feature.icon className="size-5 text-primary" aria-hidden="true" />
              </div>
              <h2 className="text-sm font-semibold">{feature.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
