"use client";

import { useState } from 'react';
import OutfitPreferenceForm from '@/components/outfit/OutfitPreferenceForm';
import OutfitDisplayArea from '@/components/outfit/OutfitDisplayArea';
import type { OutfitPreferences, GeneratedOutfits } from '@/types';
import { generateOutfitCombinations } from '@/ai/flows/generate-outfit';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

export default function GeneratorPage() {
  const [generatedOutfits, setGeneratedOutfits] = useState<GeneratedOutfits | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGenerateOutfit = async (data: OutfitPreferences) => {
    setIsLoading(true);
    setError(null);
    setGeneratedOutfits(null); 
    try {
      const result = await generateOutfitCombinations(data);
      if (result && result.outfitCombinations) {
        setGeneratedOutfits(result);
      } else {
        setError("AI couldn't generate outfits based on your preferences. Please try again.");
        toast({
          title: "No Outfits Found",
          description: "The AI couldn't generate outfits. Try adjusting your preferences.",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error("Error generating outfits:", err);
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(`Failed to generate outfits: ${errorMessage}`);
      toast({
        title: "Generation Error",
        description: `Oops! Something went wrong: ${errorMessage}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <section>
          <OutfitPreferenceForm onSubmit={handleGenerateOutfit} isLoading={isLoading} />
        </section>
        
        {(isLoading || error || generatedOutfits) && <Separator className="my-8" />}
        
        <section>
          <OutfitDisplayArea
            outfitsData={generatedOutfits}
            isLoading={isLoading}
            error={error}
          />
        </section>
      </div>
    </div>
  );
}
