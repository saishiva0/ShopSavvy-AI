
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
  // !!! CRITICAL ERROR: 'icon.png.mjs' CONFLICT !!!
  // The error "Reading source code for parsing failed" for './src/app/icon.png.mjs'
  // means YOU MUST MANUALLY FIND AND EITHER:
  // 1. DELETE the file 'src/app/icon.png.mjs' from your project's file system (located in 'src/app/').
  // OR
  // 2. RENAME 'src/app/icon.png.mjs' (e.g., to 'icon.png' if it's your actual icon image,
  //    making sure it's a valid .png, .ico, or .svg file and placed in 'src/app/').
  //
  // This is a FILE SYSTEM operation. I, the AI, CANNOT perform this for you.
  // The application will continue to show this error until 'src/app/icon.png.mjs'
  // is removed or correctly renamed by you.
  //
  // Once 'src/app/icon.png.mjs' is addressed, Next.js will automatically use
  // a valid 'icon.png' or 'favicon.ico' (etc.) placed in 'src/app/' as the site icon.
  // No explicit 'icons' entry is needed in this metadata object if you follow this convention.

  title: 'ShopSavvy AI',
  description: 'AI-powered outfit suggestions for the Gen-Z fashionista.',
  // Standard favicon handling (automatic detection of 'icon.png', 'favicon.ico', etc., 
  // in 'src/app/') will resume once the '.mjs' conflict is resolved by you.
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
