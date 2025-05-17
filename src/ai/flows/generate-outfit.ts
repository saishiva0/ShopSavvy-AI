
// Use server directive is required for all Genkit flows.
'use server';

/**
 * @fileOverview Outfit generation flow.
 *
 * This file defines a Genkit flow for generating outfit suggestions based on user preferences.
 * It focuses on color combinations, accessory types, e-commerce inspiration links, and item images.
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
    searchUrl: z.string().describe('A general search URL or category URL for finding similar items or inspiration (e.g., a link to Myntra\'s "men\'s casual shirts" category or a search for "bohemian summer dresses"). This should be a well-formed web address but not a specific product page.'),
});

const OutfitSuggestionSchema = z.object({
  description: z.string().describe('A description of the overall outfit concept and vibe.'),
  colorPalette: z.array(z.string()).describe('Suggested color palette for the outfit (e.g., ["navy blue", "white", "tan"]).'),
  topSuggestion: z.string().describe('Suggestion for the top, focusing on type and color (e.g., "A light blue linen shirt").'),
  topImageUrl: z.string().describe("A placeholder image URL for the top, dynamically colored to match the suggestion. Format: 'https://placehold.co/300x400/HEXCOLOR/FFFFFF.png', where HEXCOLOR is the 6-digit hex code (no '#') of the item's primary color (e.g., 'FF0000' for red). Use 'CCCCCC' as HEXCOLOR with '000000' for text (https://placehold.co/300x400/CCCCCC/000000.png) for a neutral grey if a specific color hex cannot be determined."),
  topImageHint: z.string().describe('A 1-2 word hint for the top image (e.g., "blue shirt", "linen top").'),
  bottomSuggestion: z.string().describe('Suggestion for the bottom, focusing on type and color (e.g., "White chino shorts").'),
  bottomImageUrl: z.string().describe("A placeholder image URL for the bottom, dynamically colored to match the suggestion. Format: 'https://placehold.co/300x400/HEXCOLOR/FFFFFF.png', where HEXCOLOR is the 6-digit hex code (no '#') of the item's primary color. Use 'CCCCCC' as HEXCOLOR with '000000' for text (https://placehold.co/300x400/CCCCCC/000000.png) for a neutral grey if a specific color hex cannot be determined."),
  bottomImageHint: z.string().describe('A 1-2 word hint for the bottom image (e.g., "chino shorts", "denim jeans").'),
  footwearSuggestion: z.string().describe('Suggestion for footwear, focusing on type and color (e.g., "Brown leather sandals").'),
  footwearImageUrl: z.string().describe("A placeholder image URL for the footwear, dynamically colored to match the suggestion. Format: 'https://placehold.co/300x400/HEXCOLOR/FFFFFF.png', where HEXCOLOR is the 6-digit hex code (no '#') of the item's primary color. Use 'CCCCCC' as HEXCOLOR with '000000' for text (https://placehold.co/300x400/CCCCCC/000000.png) for a neutral grey if a specific color hex cannot be determined."),
  footwearImageHint: z.string().describe('A 1-2 word hint for the footwear image (e.g., "leather sandals", "white sneakers").'),
  accessorySuggestions: z.array(z.string()).describe('List of suggested accessory types (e.g., "silver watch", "sunglasses", "leather belt").'),
  ecommerceLinks: z.array(EcommerceLinkSchema).describe('Links to e-commerce websites for inspiration.'),
});

const GenerateOutfitSuggestionsOutputSchema = z.object({
  outfitSuggestions: z.array(OutfitSuggestionSchema).describe('Array of AI-generated outfit suggestions focusing on color combinations, accessory types, item images, and e-commerce links.'),
});

export type GenerateOutfitSuggestionsOutput = z.infer<typeof GenerateOutfitSuggestionsOutputSchema>;


export async function generateOutfitSuggestions(input: GenerateOutfitSuggestionsInput): Promise<GenerateOutfitSuggestionsOutput> {
  return generateOutfitSuggestionsFlow(input);
}

const outfitSuggestionPrompt = ai.definePrompt({
  name: 'outfitSuggestionPrompt',
  input: {schema: GenerateOutfitSuggestionsInputSchema},
  output: {schema: GenerateOutfitSuggestionsOutputSchema},
  prompt: `You are a personal stylist AI assistant that generates outfit suggestions based on user preferences. Your focus is on color combinations, accessory types, providing inspirational e-commerce links, dynamically colored placeholder image URLs for main clothing items, and concise image hints for those items.

  Consider the following user preferences when generating outfit suggestions:
  - Occasion: {{{occasion}}}
  - Style: {{{style}}}
  - Budget: {{{budget}}} (interpret this as general price range for item suggestions, not specific costs)
  - Colors: {{{colors}}}
  - Weather: {{{weather}}}
  - Gender: {{{gender}}}

  For each outfit suggestion, you MUST provide ALL of the following fields, correctly formatted:
  - A "description" string of the outfit concept and its overall vibe.
  - A "colorPalette" array with 2-4 color names (e.g., ["navy blue", "white", "tan"]).
  - A "topSuggestion" string (e.g., "A light blue linen shirt").
  - A "topImageUrl" string. This URL MUST be a placeholder image from placehold.co representing the color of the suggested top. To create this:
    1. Identify the dominant color from your "topSuggestion" (e.g., if suggestion is "A light blue linen shirt", color is "light blue").
    2. Convert this color name to a 6-digit hexadecimal code (e.g., "light blue" becomes "ADD8E6", "red" becomes "FF0000"). Do NOT include the '#' symbol.
    3. Construct the URL in the exact format: 'https://placehold.co/300x400/HEXCOLOR/FFFFFF.png' (using FFFFFF for white text). Example for "light blue shirt": 'https://placehold.co/300x400/ADD8E6/FFFFFF.png'.
    4. If you CANNOT confidently determine a hex code, or if the color is complex (e.g., multi-color, patterned), you MUST use the default placeholder: 'https://placehold.co/300x400/CCCCCC/000000.png' (grey background, black text).
  - A "topImageHint" string. This MUST be 1 or 2 keywords extracted from "topSuggestion" for image search (e.g., if topSuggestion is "A light blue linen shirt", topImageHint could be "blue shirt" or "linen top").
  - A "bottomSuggestion" string (e.g., "White chino shorts").
  - A "bottomImageUrl" string, following the exact same color-to-hex-to-URL construction process as "topImageUrl", including the fallback for unknown colors.
  - A "bottomImageHint" string (e.g., "white shorts" or "chino shorts"), following the same keyword extraction logic as "topImageHint".
  - A "footwearSuggestion" string (e.g., "Brown leather sandals").
  - A "footwearImageUrl" string, following the exact same color-to-hex-to-URL construction process as "topImageUrl", including the fallback for unknown colors.
  - A "footwearImageHint" string (e.g., "leather sandals" or "brown sandals"), following the same keyword extraction logic as "topImageHint".
  - An "accessorySuggestions" array of strings listing suitable accessory types (e.g., ["silver watch", "leather belt"]).
  - An "ecommerceLinks" array, each object having a "storeName" (e.g., Myntra, Ajio, Amazon Fashion) and a "searchUrl" which should be a general category or search query URL on that store related to the outfit style (e.g., https://www.myntra.com/men-casual-shirts or https://www.amazon.in/s?k=bohemian+summer+dresses). Do NOT make up URLs; use real base URLs for popular e-commerce sites. Provide 2-3 such links.

  Ensure that the generated outfits are fashionable, appropriate for the specified occasion and weather, and align with the general budget idea.
  You MUST respond only with valid JSON that strictly adheres to the output schema. Do not include any conversational text, markdown formatting, or any characters outside the JSON structure. All fields defined in the schema are mandatory.
  `,
});

const generateOutfitSuggestionsFlow = ai.defineFlow(
  {
    name: 'generateOutfitSuggestionsFlow',
    inputSchema: GenerateOutfitSuggestionsInputSchema,
    outputSchema: GenerateOutfitSuggestionsOutputSchema,
  },
  async (input) => {
    try {
      const genResponse = await outfitSuggestionPrompt(input);

      if (!genResponse || !genResponse.output || !genResponse.output.outfitSuggestions || genResponse.output.outfitSuggestions.length === 0) {
        console.error(
          'AI prompt failed to return a valid output structure, or outfitSuggestions array was null/undefined/empty. Input:',
          input,
          'Raw Response:',
          genResponse 
        );
        throw new Error(
          'AI failed to generate suggestions in the expected format or no suggestions were found. The output was missing, incomplete, or empty.'
        );
      }
      // Additional check: Validate if individual suggestions have critical fields (optional, as Zod should handle this)
      // genResponse.output.outfitSuggestions.forEach((suggestion, index) => {
      //   if (!suggestion.topImageUrl || !suggestion.bottomImageUrl || !suggestion.footwearImageUrl || !suggestion.topImageHint || !suggestion.bottomImageHint || !suggestion.footwearImageHint) {
      //     console.error(`Suggestion at index ${index} is missing one or more required image URL or hint fields. Suggestion:`, suggestion, "Input:", input);
      //     throw new Error(`AI generated a suggestion (index ${index}) that is missing critical image details. Please try again.`);
      //   }
      // });


      return genResponse.output;

    } catch (flowError) {
      console.error(
        'Error occurred within generateOutfitSuggestionsFlow. Input:',
        input,
        'Caught Error:',
        flowError
      );
      // Re-throw the error to be caught by the calling page component.
      // The original error (flowError) will be logged on the server for detailed debugging.
      if (flowError instanceof Error) {
        throw new Error(
          `Outfit generation process failed: ${flowError.message}`
        );
      }
      throw new Error(
        'An unexpected error occurred during the outfit generation process.'
      );
    }
  }
);

