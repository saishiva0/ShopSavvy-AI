
"use client";

import { useState } from 'react';
import OutfitPreferenceForm from '@/components/outfit/OutfitPreferenceForm';
import OutfitDisplayArea from '@/components/outfit/OutfitDisplayArea';
import type { OutfitPreferences, GeneratedOutfitSuggestions } from '@/types';
import { generateOutfitSuggestions } from '@/ai/flows/generate-outfit';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

export default function GeneratorPage() {
  const [generatedSuggestions, setGeneratedSuggestions] = useState<GeneratedOutfitSuggestions | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGenerateOutfit = async (data: OutfitPreferences) => {
    setIsLoading(true);
    setError(null);
    setGeneratedSuggestions(null); 
    try {
      const result = await generateOutfitSuggestions(data);
      if (result && result.outfitSuggestions && result.outfitSuggestions.length > 0) {
        setGeneratedSuggestions(result);
      } else {
        setError("AI couldn't generate outfit suggestions based on your preferences. Please try again or adjust your criteria.");
        toast({
          title: "No Suggestions Found",
          description: "The AI couldn't generate suggestions. Try adjusting your preferences.",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error("Error generating outfit suggestions:", err);
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(`Failed to generate outfit suggestions: ${errorMessage}`);
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
        
        {(isLoading || error || generatedSuggestions) && <Separator className="my-8" />}
        
        <section>
          <OutfitDisplayArea
            suggestionsData={generatedSuggestions}
            isLoading={isLoading}
            error={error}
          />
        </section>
      </div>
    </div>
  );
}
