
"use client";

import type { GeneratedOutfitSuggestions } from '@/types';
import OutfitCard from './OutfitCard';
import OutfitCardSkeleton from '@/components/skeletons/OutfitCardSkeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { PackageOpen, AlertTriangle } from 'lucide-react';

interface OutfitDisplayAreaProps {
  suggestionsData: GeneratedOutfitSuggestions | null;
  isLoading: boolean;
  error: string | null;
}

export default function OutfitDisplayArea({ suggestionsData, isLoading, error }: OutfitDisplayAreaProps) {
  if (isLoading) {
    return (
      <div className="space-y-6">
        <OutfitCardSkeleton />
        <OutfitCardSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="shadow-md">
        <AlertTriangle className="h-5 w-5" />
        <AlertTitle>Error Generating Outfit Suggestions</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!suggestionsData || !suggestionsData.outfitSuggestions || suggestionsData.outfitSuggestions.length === 0) {
    return (
      <div className="text-center py-12">
        <PackageOpen className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold text-foreground">No Outfit Suggestions Generated Yet</h3>
        <p className="text-muted-foreground">Fill out the form to discover your next look!</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {suggestionsData.outfitSuggestions.map((suggestion, index) => (
        <OutfitCard key={index} outfit={suggestion} />
      ))}
    </div>
  );
}
