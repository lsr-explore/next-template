import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Home from './page';

describe('Home Page', () => {
  it('renders the heading', () => {
    render(<Home />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('renders the Next.js logo', () => {
    render(<Home />);
    expect(screen.getByAltText('Next.js logo')).toBeInTheDocument();
  });
});
