
'use server';
/**
 * @fileOverview An AI flow to rewrite text in an 8-bit video game style.
 * 
 * - eightBitify - A function that rewrites text.
 * - EightBitifyInput - The input type for the eightBitify function.
 * - EightBitifyOutput - The return type for the eightBitify function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const EightBitifyInputSchema = z.object({
  text: z.string().describe('The text to be rewritten.'),
});
export type EightBitifyInput = z.infer<typeof EightBitifyInputSchema>;

const EightBitifyOutputSchema = z.object({
  text: z.string().describe('The rewritten text in an 8-bit video game style.'),
});
export type EightBitifyOutput = z.infer<typeof EightBitifyOutputSchema>;

export async function eightBitify(input: EightBitifyInput): Promise<EightBitifyOutput> {
  return eightBitifyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'eightBitifyPrompt',
  input: { schema: EightBitifyInputSchema },
  output: { schema: EightBitifyOutputSchema },
  prompt: `You are a creative writer for a classic 8-bit video game. Rewrite the following text to sound like a character's bio from a retro arcade game. Keep it short, punchy, and full of 8-bit era charm.

INPUT TEXT:
{{{text}}}

Rewritten 8-bit bio:`,
});

const eightBitifyFlow = ai.defineFlow(
  {
    name: 'eightBitifyFlow',
    inputSchema: EightBitifyInputSchema,
    outputSchema: EightBitifyOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
