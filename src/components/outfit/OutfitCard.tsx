
"use client";

import type { OutfitSuggestion, SavedOutfit } from '@/types';
import { Button } from '@/components/ui/button';
import { Heart, Link as LinkIcon, Palette, Shirt, Footprints, Gem, Sparkles, ExternalLink, ShoppingBag } from 'lucide-react'; 
import { useFavorites } from '@/hooks/useFavorites';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface OutfitCardProps {
  outfit: OutfitSuggestion | SavedOutfit;
}

export default function OutfitCard({ outfit }: OutfitCardProps) {
  const { addFavorite, removeFavorite, isFavorite, isLoaded } = useFavorites();
  
  const currentIsFavorite = isLoaded ? isFavorite(outfit) : false;
  const savedOutfitId = (outfit as SavedOutfit).id;

  const handleFavoriteToggle = () => {
    if (currentIsFavorite && savedOutfitId) {
      removeFavorite(savedOutfitId);
    } else {
      addFavorite(outfit as OutfitSuggestion); // Ensure we pass the base type if needed by addFavorite
    }
  };

  return (
    <Card className="shadow-xl rounded-xl overflow-hidden bg-card flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl flex items-center">
              <Sparkles className="h-6 w-6 mr-2 text-primary" />
              Outfit Suggestion
            </CardTitle>
            <CardDescription>{outfit.description}</CardDescription>
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

      <CardContent className="p-4 space-y-4">
        <div>
          <h4 className="font-semibold text-md mb-2 flex items-center"><Palette className="h-5 w-5 mr-2 text-primary" /> Color Palette:</h4>
          <div className="flex flex-wrap gap-2">
            {outfit.colorPalette.map((color, idx) => (
              <Badge key={idx} variant="secondary" className="text-sm px-3 py-1">{color}</Badge>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div>
                <h4 className="font-semibold text-md mb-1 flex items-center"><Shirt className="h-5 w-5 mr-2 text-primary" /> Top:</h4>
                <p className="text-sm text-muted-foreground">{outfit.topSuggestion}</p>
            </div>
            <div>
                <h4 className="font-semibold text-md mb-1 flex items-center"><ShoppingBag className="h-5 w-5 mr-2 text-primary" /> Bottom:</h4>
                <p className="text-sm text-muted-foreground">{outfit.bottomSuggestion}</p>
            </div>
            <div>
                <h4 className="font-semibold text-md mb-1 flex items-center"><Footprints className="h-5 w-5 mr-2 text-primary" /> Footwear:</h4>
                <p className="text-sm text-muted-foreground">{outfit.footwearSuggestion}</p>
            </div>
        </div>
        
        {outfit.accessorySuggestions && outfit.accessorySuggestions.length > 0 && (
          <div className="pt-2">
            <h4 className="font-semibold text-md mb-1 flex items-center">
                <Gem className="h-5 w-5 mr-2 text-primary" />
                Accessory Suggestions:
            </h4>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 pl-1">
              {outfit.accessorySuggestions.map((acc, idx) => (
                <li key={idx}>{acc}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
      
      {outfit.ecommerceLinks && outfit.ecommerceLinks.length > 0 && (
        <>
          <Separator/>
          <CardFooter className="p-4 bg-muted/30 flex-col items-start space-y-2">
            <h4 className="font-semibold text-md flex items-center mb-1"><LinkIcon className="h-5 w-5 mr-2 text-primary" /> Shop Similar Styles:</h4>
            <div className="flex flex-wrap gap-2">
              {outfit.ecommerceLinks.map((link, idx) => (
                <Button key={idx} variant="outline" size="sm" asChild className="shadow-sm hover:shadow-md transition-shadow">
                  <a href={link.searchUrl} target="_blank" rel="noopener noreferrer">
                    {link.storeName}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              ))}
            </div>
          </CardFooter>
        </>
      )}
    </Card>
  );
}
