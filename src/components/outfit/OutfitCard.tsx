"use client";

import type { OutfitCombination, SavedOutfit } from '@/types';
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';
import { Heart, DollarSign, ShoppingBag, Footprints, Gem } from 'lucide-react';
import { useFavorites } from '@/hooks/useFavorites';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface OutfitCardProps {
  outfit: OutfitCombination | SavedOutfit;
  isInitiallyFavorite?: boolean;
}

export default function OutfitCard({ outfit }: OutfitCardProps) {
  const { addFavorite, removeFavorite, isFavorite, isLoaded } = useFavorites();
  
  const currentIsFavorite = isLoaded ? isFavorite(outfit) : false;
  const savedOutfitId = (outfit as SavedOutfit).id;

  const handleFavoriteToggle = () => {
    if (currentIsFavorite && savedOutfitId) {
      removeFavorite(savedOutfitId);
    } else {
      addFavorite(outfit);
    }
  };

  const categoryMap: { [key: string]: { icon: React.ElementType, hint: string } } = {
    top: { icon: ShoppingBag, hint: "shirt top" },
    bottom: { icon: ShoppingBag, hint: "pants jeans" }, // Could use different icon for pants if available
    shoes: { icon: Footprints, hint: "sneakers shoes" },
    accessories: { icon: Gem, hint: "jewelry accessory" }
  };

  return (
    <Card className="shadow-xl rounded-xl overflow-hidden bg-card flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl">Outfit Suggestion</CardTitle>
            <CardDescription>Curated just for you!</CardDescription>
          </div>
          {isLoaded && (
            <Button
              variant={currentIsFavorite ? "default" : "outline"}
              size="icon"
              onClick={handleFavoriteToggle}
              className="transition-all duration-300 hover:scale-110"
              aria-label={currentIsFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart className={`h-5 w-5 ${currentIsFavorite ? "fill-primary-foreground" : "fill-primary"}`} />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 flex-grow">
        <ProductCard product={outfit.top} categoryHint={categoryMap.top.hint} />
        <ProductCard product={outfit.bottom} categoryHint={categoryMap.bottom.hint} />
        <ProductCard product={outfit.shoes} categoryHint={categoryMap.shoes.hint} />
        {outfit.accessories && outfit.accessories.length > 0 && (
           <ProductCard product={outfit.accessories[0]} categoryHint={categoryMap.accessories.hint} />
        )}
        {/* Placeholder if less than 4 main items */}
        {(!outfit.accessories || outfit.accessories.length === 0) && <div className="hidden lg:block"></div>}
      </CardContent>
      
      <Separator className="my-0" />

      <CardFooter className="p-4 bg-muted/50 flex justify-between items-center">
        <div className="text-lg font-semibold flex items-center">
          <DollarSign className="h-5 w-5 mr-2 text-primary" />
          Total Cost: ${outfit.totalOutfitCost.toFixed(2)}
        </div>
      </CardFooter>
    </Card>
  );
}
