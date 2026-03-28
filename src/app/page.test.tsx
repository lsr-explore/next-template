import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';
import Home from './page';

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: React.ComponentProps<'a'>) => (
    <a href={href as string} {...props}>
      {children}
    </a>
  ),
}));

describe('Home Page', () => {
  it('renders the heading', () => {
    render(<Home />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('A modern contact list');
  });

  it('renders the sign in and view contacts links', () => {
    render(<Home />);
    screen.getByRole('button', { name: 'Sign in' });
    screen.getByRole('button', { name: 'View contacts' });
  });

  it('renders the feature cards', () => {
    render(<Home />);
    screen.getByText('Contact Management');
    screen.getByText('Role-Based Access');
    screen.getByText('Search & Filter');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Home />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
