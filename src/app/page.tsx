import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import Image from 'next/image';

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
          Tired of endless scrolling? ShopSavvy AI curates personalized outfits just for you. Tell us your style, and let our AI do the magic!
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
      <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl w-full">
        {[
          { src: "https://placehold.co/300x400.png", alt: "Stylish outfit 1", hint: "fashion model" },
          { src: "https://placehold.co/300x400.png", alt: "Stylish outfit 2", hint: "streetwear fashion" },
          { src: "https://placehold.co/300x400.png", alt: "Stylish outfit 3", hint: "casual outfit" },
          { src: "https://placehold.co/300x400.png", alt: "Stylish outfit 4", hint: "elegant dress" },
        ].map((img, index) => (
          <div key={index} className="rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
            <Image
              src={img.src}
              alt={img.alt}
              width={300}
              height={400}
              className="object-cover w-full h-full"
              data-ai-hint={img.hint}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
