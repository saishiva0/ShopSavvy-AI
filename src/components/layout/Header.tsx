import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Shirt, Sparkles, Heart } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="ml-4 mr-6 flex items-center space-x-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">ShopSavvy AI</span>
        </Link>
        <nav className="flex items-center space-x-2 ml-auto">
          <Button variant="ghost" asChild>
            <Link href="/generator" className="flex items-center">
              <Shirt className="mr-2 h-4 w-4" />
              Generator
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/favorites" className="flex items-center">
              <Heart className="mr-2 h-4 w-4" />
              Favorites
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
