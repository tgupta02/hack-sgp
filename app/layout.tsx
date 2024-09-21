import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

import { headers } from 'next/headers';
import ContextProvider from '@/context';

export const metadata: Metadata = {
  title: 'Refugee Identification App',
  description: 'Empowering refugees with digital identification.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookies = headers().get('cookie');

  return (
    <html lang="en">
      <body className={inter.className}>
        <ContextProvider cookies={cookies}>{children}</ContextProvider>
      </body>
    </html>
  );
}
