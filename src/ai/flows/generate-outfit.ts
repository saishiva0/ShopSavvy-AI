// Use server directive is required for all Genkit flows.
'use server';

/**
 * @fileOverview Outfit generation flow.
 *
 * This file defines a Genkit flow for generating outfit combinations based on user preferences.
 * It includes the input and output schemas, the main flow function, and the prompt definition.
 *
 * @exports generateOutfitCombinations - The main function to generate outfit combinations.
 * @exports GenerateOutfitCombinationsInput - The input type for the generateOutfitCombinations function.
 * @exports GenerateOutfitCombinationsOutput - The output type for the generateOutfitCombinations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';


const GenerateOutfitCombinationsInputSchema = z.object({
  occasion: z.string().describe('The occasion for the outfit (e.g., casual, work, party).'),
  style: z.string().describe('The desired style of the outfit (e.g., streetwear, minimalist).'),
  budget: z.enum(['low', 'medium', 'high']).describe('The budget for the outfit.'),
  colors: z.string().describe('The preferred colors for the outfit.'),
  weather: z.string().describe('The weather conditions for which the outfit is needed.'),
  gender: z.string().describe('The gender for whom the outfit is intended (male, female, unisex).'),
});

export type GenerateOutfitCombinationsInput = z.infer<typeof GenerateOutfitCombinationsInputSchema>;

const ProductSchema = z.object({
    name: z.string().describe('The name of the product.'),
    imageUrl: z.string().url().describe('URL of the product image.'),
    price: z.number().describe('The price of the product.'),
    purchaseUrl: z.string().url().describe('URL to purchase the product.'),
});

const OutfitCombinationSchema = z.object({
    top: ProductSchema.describe('Details of the top item.'),
    bottom: ProductSchema.describe('Details of the bottom item.'),
    shoes: ProductSchema.describe('Details of the shoes.'),
    accessories: z.array(ProductSchema).describe('Array of accessories for the outfit.'),
});

const GenerateOutfitCombinationsOutputSchema = z.object({
  outfitCombinations: z.array(OutfitCombinationSchema).describe('Array of AI-generated outfit combinations.'),
  totalOutfitCost: z.number().describe('The total cost of the outfit.'),
});

export type GenerateOutfitCombinationsOutput = z.infer<typeof GenerateOutfitCombinationsOutputSchema>;


export async function generateOutfitCombinations(input: GenerateOutfitCombinationsInput): Promise<GenerateOutfitCombinationsOutput> {
  return generateOutfitCombinationsFlow(input);
}

const outfitPrompt = ai.definePrompt({
  name: 'outfitPrompt',
  input: {schema: GenerateOutfitCombinationsInputSchema},
  output: {schema: GenerateOutfitCombinationsOutputSchema},
  prompt: `You are a personal stylist AI assistant that generates outfit combinations based on user preferences.

  Consider the following user preferences when generating outfit combinations:
  - Occasion: {{{occasion}}}
  - Style: {{{style}}}
  - Budget: {{{budget}}}
  - Colors: {{{colors}}}
  - Weather: {{{weather}}}
  - Gender: {{{gender}}}

  Generate outfit combinations that match the user's preferences. Include product names, image URLs, prices, and purchase URLs for each item in the outfit. Provide a total outfit cost.

  Ensure that the generated outfits are fashionable, appropriate for the specified occasion and weather, and within the given budget.
  Do not include any conversational text, only respond with valid JSON as specified in the schema.
  `,
});

const generateOutfitCombinationsFlow = ai.defineFlow(
  {
    name: 'generateOutfitCombinationsFlow',
    inputSchema: GenerateOutfitCombinationsInputSchema,
    outputSchema: GenerateOutfitCombinationsOutputSchema,
  },
  async input => {
    const {output} = await outfitPrompt(input);
    return output!;
  }
);
