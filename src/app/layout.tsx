import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Contact List',
  description:
    'A contact management app built with Next.js, demonstrating Server Actions, role-based access, and accessibility best practices.',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex flex-1 flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
