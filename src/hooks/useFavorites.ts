
"use client";

import type { SavedOutfit, OutfitSuggestion } from '@/types';
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

const FAVORITES_KEY = 'shopSavvyAIFavorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<SavedOutfit[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem(FAVORITES_KEY);
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error("Failed to load favorites from localStorage", error);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
      } catch (error) {
        console.error("Failed to save favorites to localStorage", error);
        toast({
          title: "Error Saving Favorites",
          description: "Could not save changes to favorites. Your browser storage might be full or corrupted.",
          variant: "destructive",
        });
      }
    }
  }, [favorites, isLoaded, toast]);

  const addFavorite = useCallback((suggestion: OutfitSuggestion) => {
    const newFavorite: SavedOutfit = {
      ...suggestion,
      id: Date.now().toString() + Math.random().toString(36).substring(2,9), // Simple unique enough ID
      savedAt: Date.now(),
    };
    setFavorites((prevFavorites) => {
      // Updated duplicate check using the outfit description
      const isDuplicate = prevFavorites.some(fav => fav.description === suggestion.description);
      if (isDuplicate) {
        toast({
          title: "Already a Favorite",
          description: "This outfit suggestion is already in your favorites.",
          variant: "default",
        });
        return prevFavorites;
      }
      toast({
        title: "Added to Favorites!",
        description: "Outfit suggestion saved successfully.",
        variant: "default",
      });
      return [newFavorite, ...prevFavorites];
    });
  }, [toast]);

  const removeFavorite = useCallback((suggestionId: string) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((fav) => fav.id !== suggestionId)
    );
    toast({
      title: "Removed from Favorites",
      description: "Outfit suggestion removed successfully.",
      variant: "default",
    });
  }, [toast]);

  const isFavorite = useCallback((suggestion: OutfitSuggestion) => {
    // Updated favorite check using the outfit description
    return favorites.some(fav => fav.description === suggestion.description);
  }, [favorites]);

  return { favorites, addFavorite, removeFavorite, isFavorite, isLoaded };
}
