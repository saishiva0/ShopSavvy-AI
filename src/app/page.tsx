
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] container px-4 py-12">
      <div className="text-center space-y-6 max-w-3xl">
        <div className="inline-block rounded-lg bg-secondary/20 px-3 py-1 text-sm font-medium text-secondary-foreground shadow-sm">
          Your Personal AI Stylist
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Discover Your Next <span className="text-primary">Perfect Outfit</span>
        </h1>
        <p className="text-lg text-muted-foreground md:text-xl max-w-2xl mx-auto">
          Overwhelmed by fashion choices? ShopSavvy AI cuts through the noise. We're your smart style companion, instantly transforming your preferences for occasion, vibe, and color into unique, curated outfit suggestions. Discover perfectly matched color palettes, ideal accessory pairings, and direct inspiration from top e-commerce sites. Effortless discovery, uniquely you. Ready to find your signature look?
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Link href="/generator">
              Generate Your Outfit
              <Sparkles className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="shadow-sm hover:shadow-md transition-shadow duration-300">
            <Link href="/favorites">
              View Favorites
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
