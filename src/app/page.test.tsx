import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import Home from './page';

describe('Home Page', () => {
  it('renders the heading', () => {
    render(<Home />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('A modern contact list');
  });

  it('renders the sign in and view contacts links', () => {
    render(<Home />);
    expect(screen.getByRole('link', { name: 'Sign in' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'View contacts' })).toBeInTheDocument();
  });

  it('renders the feature cards', () => {
    render(<Home />);
    expect(screen.getByText('Contact Management')).toBeInTheDocument();
    expect(screen.getByText('Role-Based Access')).toBeInTheDocument();
    expect(screen.getByText('Search & Filter')).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Home />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
