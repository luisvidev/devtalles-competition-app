import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

//* Components
import NavBar from '../components/NavBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Sorteos App',
    description: 'Generated by create next app',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} grid min-h-full relative`}>{children}</body>
    </html>
  );
}
