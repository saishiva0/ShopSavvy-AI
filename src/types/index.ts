
import { z } from 'zod';
import type { 
  GenerateOutfitSuggestionsInput as AIInput, 
  GenerateOutfitSuggestionsOutput as AIOutput,
  // We need to refer to the Zod schema objects from the flow to infer types correctly
  // However, the flow file exports the Zod schema *instances*, not their types directly for inference in this manner.
  // So, we'll define the schema for OutfitSuggestion and EcommerceLink here too for strong typing if needed,
  // or rely on the inferred types from the flow's output schema.
  // For robust type inference, let's use the Zod schemas exported by the flow if possible,
  // or redefine them here if direct schema export for inference isn't clean.
  // The flow exports `GenerateOutfitSuggestionsOutput` which contains `OutfitSuggestionSchema`.
  // Let's adjust to directly use the generated schema types from the flow's output.
} from '@/ai/flows/generate-outfit';

// Re-importing the Zod schemas from the flow isn't standard for type inference.
// Instead, we import the Zod *types* inferred in the flow file itself.
// The flow file `generate-outfit.ts` exports:
// export type GenerateOutfitSuggestionsInput = z.infer<typeof GenerateOutfitSuggestionsInputSchema>;
// export type GenerateOutfitSuggestionsOutput = z.infer<typeof GenerateOutfitSuggestionsOutputSchema>;
// And implicitly, the types for EcommerceLink and OutfitSuggestion are part of GenerateOutfitSuggestionsOutput.

// Let's define the specific object types here based on the Zod schemas in the flow for clarity and usage in components.
export const EcommerceLinkSchema = z.object({
    storeName: z.string(),
    searchUrl: z.string(), // Removed .url()
});
export type EcommerceLink = z.infer<typeof EcommerceLinkSchema>;

export const OutfitSuggestionSchema = z.object({
  description: z.string(),
  colorPalette: z.array(z.string()),
  topSuggestion: z.string(),
  bottomSuggestion: z.string(),
  footwearSuggestion: z.string(),
  accessorySuggestions: z.array(z.string()),
  ecommerceLinks: z.array(EcommerceLinkSchema),
});
export type OutfitSuggestion = z.infer<typeof OutfitSuggestionSchema>;

// These types are derived from the AI flow's output
export type OutfitPreferences = AIInput;
export type GeneratedOutfitSuggestions = AIOutput; // This will be { outfitSuggestions: OutfitSuggestion[] }

// SavedOutfit will now be based on OutfitSuggestion
export interface SavedOutfit extends OutfitSuggestion {
  id: string; 
  savedAt: number; 
}

// This Product type is for general use, e.g. by ProductCard if it's used elsewhere.
// It's no longer directly part of the primary outfit suggestion structure.
export const ProductSchema = z.object({
    name: z.string().describe('The name of the product.'),
    imageUrl: z.string().url().describe('URL of the product image.'),
    price: z.number().describe('The price of the product.'),
    purchaseUrl: z.string().url().describe('URL to purchase the product.'),
});
export type Product = z.infer<typeof ProductSchema>;


// Options remain the same
export const OccasionOptions = ["casual", "work", "party", "formal", "gym", "date night", "vacation"] as const;
export type Occasion = typeof OccasionOptions[number];

export const StyleOptions = ["streetwear", "minimalist", "bohemian", "classic", "sporty", "vintage", "chic"] as const;
export type Style = typeof StyleOptions[number];

export const BudgetOptions = ["low", "medium", "high"] as const;
export type Budget = typeof BudgetOptions[number];

export const WeatherOptions = ["sunny", "cloudy", "rainy", "snowy", "windy", "warm", "cold"] as const;
export type Weather = typeof WeatherOptions[number];

export const GenderOptions = ["male", "female", "unisex"] as const;
export type Gender = typeof GenderOptions[number];

