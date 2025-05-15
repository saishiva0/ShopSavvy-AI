
// Use server directive is required for all Genkit flows.
'use server';

/**
 * @fileOverview Outfit generation flow.
 *
 * This file defines a Genkit flow for generating outfit suggestions based on user preferences.
 * It focuses on color combinations, accessory types, and e-commerce inspiration links.
 *
 * @exports generateOutfitSuggestions - The main function to generate outfit suggestions.
 * @exports GenerateOutfitSuggestionsInput - The input type for the generateOutfitSuggestions function.
 * @exports GenerateOutfitSuggestionsOutput - The output type for the generateOutfitSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';


const GenerateOutfitSuggestionsInputSchema = z.object({
  occasion: z.string().describe('The occasion for the outfit (e.g., casual, work, party).'),
  style: z.string().describe('The desired style of the outfit (e.g., streetwear, minimalist).'),
  budget: z.enum(['low', 'medium', 'high']).describe('The budget for the outfit (interpreted as general price range).'),
  colors: z.string().describe('The preferred colors for the outfit.'),
  weather: z.string().describe('The weather conditions for which the outfit is needed.'),
  gender: z.string().describe('The gender for whom the outfit is intended (male, female, unisex).'),
});

export type GenerateOutfitSuggestionsInput = z.infer<typeof GenerateOutfitSuggestionsInputSchema>;

const EcommerceLinkSchema = z.object({
    storeName: z.string().describe('Name of the e-commerce store (e.g., Myntra, Ajio, Amazon Fashion).'),
    searchUrl: z.string().describe('A general search URL or category URL for finding similar items or inspiration (e.g., a link to Myntra\'s "men\'s casual shirts" category or a search for "bohemian summer dresses"). Must be a valid URL.'),
});

const OutfitSuggestionSchema = z.object({
  description: z.string().describe('A description of the overall outfit concept and vibe.'),
  colorPalette: z.array(z.string()).describe('Suggested color palette for the outfit (e.g., ["navy blue", "white", "tan"]).'),
  topSuggestion: z.string().describe('Suggestion for the top, focusing on type and color (e.g., "A light blue linen shirt").'),
  bottomSuggestion: z.string().describe('Suggestion for the bottom, focusing on type and color (e.g., "White chino shorts").'),
  footwearSuggestion: z.string().describe('Suggestion for footwear, focusing on type and color (e.g., "Brown leather sandals").'),
  accessorySuggestions: z.array(z.string()).describe('List of suggested accessory types (e.g., "silver watch", "sunglasses", "leather belt").'),
  ecommerceLinks: z.array(EcommerceLinkSchema).describe('Links to e-commerce websites for inspiration.'),
});

const GenerateOutfitSuggestionsOutputSchema = z.object({
  outfitSuggestions: z.array(OutfitSuggestionSchema).describe('Array of AI-generated outfit suggestions focusing on color combinations and accessory types.'),
});

export type GenerateOutfitSuggestionsOutput = z.infer<typeof GenerateOutfitSuggestionsOutputSchema>;


export async function generateOutfitSuggestions(input: GenerateOutfitSuggestionsInput): Promise<GenerateOutfitSuggestionsOutput> {
  return generateOutfitSuggestionsFlow(input);
}

const outfitSuggestionPrompt = ai.definePrompt({
  name: 'outfitSuggestionPrompt',
  input: {schema: GenerateOutfitSuggestionsInputSchema},
  output: {schema: GenerateOutfitSuggestionsOutputSchema},
  prompt: `You are a personal stylist AI assistant that generates outfit suggestions based on user preferences, focusing on color combinations, accessory types, and providing inspirational e-commerce links.

  Consider the following user preferences when generating outfit suggestions:
  - Occasion: {{{occasion}}}
  - Style: {{{style}}}
  - Budget: {{{budget}}} (interpret this as general price range for item suggestions, not specific costs)
  - Colors: {{{colors}}}
  - Weather: {{{weather}}}
  - Gender: {{{gender}}}

  For each outfit suggestion, you MUST provide:
  - A general "description" of the outfit concept and its overall vibe.
  - A "colorPalette" array with 2-4 color names (e.g., ["navy blue", "white", "tan"]).
  - A "topSuggestion" string (e.g., "A light blue linen shirt").
  - A "bottomSuggestion" string (e.g., "White chino shorts").
  - A "footwearSuggestion" string (e.g., "Brown leather sandals").
  - An "accessorySuggestions" array of strings listing suitable accessory types (e.g., ["silver watch", "leather belt"]).
  - An "ecommerceLinks" array, each object having a "storeName" (e.g., Myntra, Ajio, Amazon Fashion) and a valid "searchUrl" which should be a general category or search query URL on that store related to the outfit style (e.g., https://www.myntra.com/men-casual-shirts or https://www.amazon.in/s?k=bohemian+summer+dresses). Do NOT make up URLs; use real base URLs for popular e-commerce sites. Provide 2-3 such links.

  Ensure that the generated outfits are fashionable, appropriate for the specified occasion and weather, and align with the general budget idea.
  You MUST respond only with valid JSON that strictly adheres to the output schema. Do not include any conversational text, markdown formatting, or any characters outside the JSON structure.
  `,
});

const generateOutfitSuggestionsFlow = ai.defineFlow(
  {
    name: 'generateOutfitSuggestionsFlow',
    inputSchema: GenerateOutfitSuggestionsInputSchema,
    outputSchema: GenerateOutfitSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await outfitSuggestionPrompt(input);
    if (!output) {
        throw new Error('AI failed to generate suggestions in the expected format.');
    }
    return output;
  }
);

