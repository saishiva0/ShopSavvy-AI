"use client";

import OutfitCard from '@/components/outfit/OutfitCard';
import { useFavorites } from '@/hooks/useFavorites';
import { HeartCrack, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function FavoritesPage() {
  const { favorites, isLoaded } = useFavorites();

  if (!isLoaded) {
    // Optional: Add a skeleton loader for the whole page or a simple loading text
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <Sparkles className="mx-auto h-12 w-12 animate-pulse text-primary mb-4" />
        <p className="text-muted-foreground">Loading your favorite looks...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-foreground">Your Favorite Outfits</h1>
      {favorites.length === 0 ? (
        <div className="text-center py-12 bg-card shadow-lg rounded-xl p-8">
          <HeartCrack className="mx-auto h-16 w-16 text-muted-foreground mb-6" />
          <h2 className="text-2xl font-semibold text-foreground mb-2">No Favorites Yet!</h2>
          <p className="text-muted-foreground mb-6">
            Looks like your closet of favorites is empty. <br />
            Head over to the generator to find some amazing outfits to save!
          </p>
          <Button asChild size="lg" className="shadow-md hover:shadow-lg transition-shadow">
            <Link href="/generator">
              <Sparkles className="mr-2 h-5 w-5" />
              Discover Outfits
            </Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-8">
          {favorites.map((outfit) => (
            <OutfitCard key={outfit.id} outfit={outfit} />
          ))}
        </div>
      )}
    </div>
  );
}
