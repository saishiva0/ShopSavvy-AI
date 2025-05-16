
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/Header';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'ShopSavvy AI',
  description: 'AI-powered outfit suggestions for the Gen-Z fashionista.',
  // Favicon configuration:
  // Next.js will automatically detect 'icon.png', 'favicon.ico', etc., 
  // placed directly in the 'src/app/' directory.

  // !!! IMPORTANT !!!
  // THE CURRENT BUILD ERROR related to 'icon.png.mjs' is caused by a
  // misnamed or unwanted file in your 'src/app/' directory.
  // PLEASE MANUALLY REMOVE OR RENAME THE FILE 'src/app/icon.png.mjs'.
  // This metadata configuration is correctly set to allow automatic favicon 
  // detection once that conflicting file is addressed by you.
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} font-sans antialiased`}>
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
