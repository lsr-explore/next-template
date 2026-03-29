'use client';

import { Globe } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';

const localeLabels: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
};

export const LanguageToggle = () => {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const tr = useTranslations('language');

  const handleChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    router.replace(pathname, { locale: ev.target.value as Locale });
  };

  return (
    <div className="flex items-center gap-1.5">
      <Globe className="size-4 text-muted-foreground" aria-hidden="true" />
      <select
        value={locale}
        onChange={handleChange}
        aria-label={tr('label')}
        className="cursor-pointer appearance-none border-none bg-transparent text-sm text-muted-foreground hover:text-foreground focus:outline-none"
      >
        {Object.entries(localeLabels).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};
