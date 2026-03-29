import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';

vi.mock('next-intl/server', () => ({
  getTranslations: () =>
    Promise.resolve((key: string) => {
      const translations: Record<string, string> = {
        signIn: 'Sign in',
        title: 'A modern contact list',
        description:
          'Built with Next.js, Server Actions, and React 19. Designed with accessibility and clean architecture in mind.',
        viewContacts: 'View contacts',
        'features.contactManagement.title': 'Contact Management',
        'features.contactManagement.description':
          'View, create, edit, and delete contacts with a clean, accessible interface.',
        'features.roleBasedAccess.title': 'Role-Based Access',
        'features.roleBasedAccess.description':
          'Viewers can browse contacts. Editors can create, update, and delete.',
        'features.searchFilter.title': 'Search & Filter',
        'features.searchFilter.description':
          'Quickly find contacts by name, email, location, or phone number.',
      };
      return translations[key] ?? key;
    }),
}));

vi.mock('@/i18n/navigation', () => ({
  Link: ({ children, href, ...props }: React.ComponentProps<'a'>) => (
    <a href={href as string} {...props}>
      {children}
    </a>
  ),
}));

import Home from './page';

describe('Home Page', () => {
  it('renders the heading', async () => {
    const page = await Home();
    render(page);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('A modern contact list');
  });

  it('renders the sign in and view contacts links', async () => {
    const page = await Home();
    render(page);
    screen.getByRole('button', { name: 'Sign in' });
    screen.getByRole('button', { name: 'View contacts' });
  });

  it('renders the feature cards', async () => {
    const page = await Home();
    render(page);
    screen.getByText('Contact Management');
    screen.getByText('Role-Based Access');
    screen.getByText('Search & Filter');
  });

  it('has no accessibility violations', async () => {
    const page = await Home();
    const { container } = render(page);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
