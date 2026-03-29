'use client';

import { cn } from '@next-template/ui/lib/utils';
import { Link, usePathname } from '@/i18n/navigation';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export const NavLink = ({ href, children }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={cn(
        'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
        isActive
          ? 'bg-muted text-foreground'
          : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground',
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      {children}
    </Link>
  );
};
