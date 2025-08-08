
'use server';
/**
 * @fileOverview An AI assistant for the developer card.
 *
 * - askAssistant - A function that answers questions based on developer data.
 * - AskAssistantInput - The input type for the askAssistant function.
 * - AskAssistantOutput - The return type for the askAssistant function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const AskAssistantInputSchema = z.object({
  question: z.string().describe('The question from the user.'),
  context: z.string().describe("The developer's data as a JSON string."),
});
export type AskAssistantInput = z.infer<typeof AskAssistantInputSchema>;

const AskAssistantOutputSchema = z.object({
  answer: z.string().describe('The answer to the question.'),
});
export type AskAssistantOutput = z.infer<typeof AskAssistantOutputSchema>;

export async function askAssistant(input: AskAssistantInput): Promise<AskAssistantOutput> {
  return askAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'assistantPrompt',
  input: { schema: AskAssistantInputSchema },
  output: { schema: AskAssistantOutputSchema },
  prompt: `You are a helpful AI assistant for a developer. Your goal is to answer questions about the developer based on the provided data. Be friendly, professional, and concise.

Here is the developer's data:
\`\`\`json
{{{context}}}
\`\`\`

Here is the user's question:
"{{{question}}}"

Based on the data, provide a helpful answer. If the question is about availability, salary, or asks you to make a subjective judgment you can't answer from the data, politely decline and suggest contacting the developer directly.`,
});

const askAssistantFlow = ai.defineFlow(
  {
    name: 'askAssistantFlow',
    inputSchema: AskAssistantInputSchema,
    outputSchema: AskAssistantOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
