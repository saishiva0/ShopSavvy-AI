"use client";

import type { SavedOutfit, OutfitCombination } from '@/types';
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
      // Fallback to empty array or handle error
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
          title: "Error",
          description: "Could not save changes to favorites. Your browser storage might be full.",
          variant: "destructive",
        });
      }
    }
  }, [favorites, isLoaded, toast]);

  const addFavorite = useCallback((outfit: OutfitCombination) => {
    const newFavorite: SavedOutfit = {
      ...outfit,
      id: Date.now().toString() + Math.random().toString(36).substring(2,9), // Simple unique enough ID
      savedAt: Date.now(),
    };
    setFavorites((prevFavorites) => {
      // Check if outfit (by content, e.g. first item name) is already favorited to prevent duplicates
      // This is a simple check; a more robust check would compare more properties or generate a content hash.
      const isDuplicate = prevFavorites.some(fav => fav.top.name === outfit.top.name && fav.bottom.name === outfit.bottom.name);
      if (isDuplicate) {
        toast({
          title: "Already a Favorite",
          description: "This outfit is already in your favorites.",
        });
        return prevFavorites;
      }
      toast({
        title: "Added to Favorites!",
        description: "Outfit saved successfully.",
      });
      return [newFavorite, ...prevFavorites];
    });
  }, [toast]);

  const removeFavorite = useCallback((outfitId: string) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((fav) => fav.id !== outfitId)
    );
    toast({
      title: "Removed from Favorites",
      description: "Outfit removed successfully.",
    });
  }, [toast]);

  const isFavorite = useCallback((outfit: OutfitCombination) => {
    // A simple check based on top and bottom item names
    return favorites.some(fav => fav.top.name === outfit.top.name && fav.bottom.name === outfit.bottom.name && fav.shoes.name === outfit.shoes.name);
  }, [favorites]);

  return { favorites, addFavorite, removeFavorite, isFavorite, isLoaded };
}
