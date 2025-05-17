
import { z } from 'zod';
import type { 
  GenerateOutfitSuggestionsInput as AIInput, 
  GenerateOutfitSuggestionsOutput as AIOutput,
} from '@/ai/flows/generate-outfit';

export const EcommerceLinkSchema = z.object({
    storeName: z.string(),
    searchUrl: z.string().describe('A general search URL or category URL, not a specific product page.'), 
});
export type EcommerceLink = z.infer<typeof EcommerceLinkSchema>;

export const OutfitSuggestionSchema = z.object({
  description: z.string(),
  colorPalette: z.array(z.string()),
  topSuggestion: z.string(),
  topImageUrl: z.string().describe("A placeholder image URL for the top, dynamically colored. E.g., 'https://placehold.co/300x400/HEXCOLOR/FFFFFF.png'. Use 'CCCCCC/000000' for neutral grey if color unknown."),
  topImageHint: z.string().describe('A 1-2 word hint for the top image (e.g., "blue shirt", "linen top").'),
  bottomSuggestion: z.string(),
  bottomImageUrl: z.string().describe("A placeholder image URL for the bottom, dynamically colored. E.g., 'https://placehold.co/300x400/HEXCOLOR/FFFFFF.png'. Use 'CCCCCC/000000' for neutral grey if color unknown."),
  bottomImageHint: z.string().describe('A 1-2 word hint for the bottom image (e.g., "chino shorts", "denim jeans").'),
  footwearSuggestion: z.string(),
  footwearImageUrl: z.string().describe("A placeholder image URL for footwear, dynamically colored. E.g., 'https://placehold.co/300x400/HEXCOLOR/FFFFFF.png'. Use 'CCCCCC/000000' for neutral grey if color unknown."),
  footwearImageHint: z.string().describe('A 1-2 word hint for the footwear image (e.g., "leather sandals", "white sneakers").'),
  accessorySuggestions: z.array(z.string()),
  ecommerceLinks: z.array(EcommerceLinkSchema),
});
export type OutfitSuggestion = z.infer<typeof OutfitSuggestionSchema>;

export type OutfitPreferences = AIInput;
export type GeneratedOutfitSuggestions = AIOutput;

export interface SavedOutfit extends OutfitSuggestion {
  id: string; 
  savedAt: number; 
}

export const ProductSchema = z.object({
    name: z.string().describe('The name of the product.'),
    imageUrl: z.string().url().describe('URL of the product image.'),
    price: z.number().describe('The price of the product.'),
    purchaseUrl: z.string().url().describe('URL to purchase the product.'),
});
export type Product = z.infer<typeof ProductSchema>;

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

