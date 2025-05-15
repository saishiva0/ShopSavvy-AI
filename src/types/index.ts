import type { GenerateOutfitCombinationsInput, GenerateOutfitCombinationsOutput, ProductSchema as AIProductSchema, OutfitCombinationSchema as AIOutfitCombinationSchema } from '@/ai/flows/generate-outfit';

export type OutfitPreferences = GenerateOutfitCombinationsInput;

export type Product = Zod.infer<typeof AIProductSchema>;
export type OutfitCombination = Zod.infer<typeof AIOutfitCombinationSchema>;
export type GeneratedOutfits = GenerateOutfitCombinationsOutput;

export interface SavedOutfit extends OutfitCombination {
  id: string; // Unique ID for the saved outfit, e.g., timestamp or UUID
  savedAt: number; // Timestamp
}

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
