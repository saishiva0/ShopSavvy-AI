"use client";

import type { GeneratedOutfits, OutfitCombination } from '@/types';
import OutfitCard from './OutfitCard';
import OutfitCardSkeleton from '@/components/skeletons/OutfitCardSkeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { PackageOpen, AlertTriangle } from 'lucide-react';

interface OutfitDisplayAreaProps {
  outfitsData: GeneratedOutfits | null;
  isLoading: boolean;
  error: string | null;
}

export default function OutfitDisplayArea({ outfitsData, isLoading, error }: OutfitDisplayAreaProps) {
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
        <AlertTitle>Error Generating Outfits</AlertTitle>
        <AlertDescription>{error}. Please try adjusting your preferences or try again later.</AlertDescription>
      </Alert>
    );
  }

  if (!outfitsData || outfitsData.outfitCombinations.length === 0) {
    return (
      <div className="text-center py-12">
        <PackageOpen className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold text-foreground">No Outfits Generated Yet</h3>
        <p className="text-muted-foreground">Fill out the form to discover your next look!</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {outfitsData.outfitCombinations.map((outfit, index) => (
        <OutfitCard key={index} outfit={outfit} />
      ))}
    </div>
  );
}
