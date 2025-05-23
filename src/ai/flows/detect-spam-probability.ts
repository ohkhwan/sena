// src/ai/flows/detect-spam-probability.ts
'use server';
/**
 * @fileOverview Detects the probability that a call is spam.
 *
 * - detectSpamProbability - A function that determines the probability of a call being spam.
 * - DetectSpamProbabilityInput - The input type for the detectSpamProbability function.
 * - DetectSpamProbabilityOutput - The return type for the detectSpamProbability function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const DetectSpamProbabilityInputSchema = z.object({
  callerResponse: z.string().describe('The response from the caller.'),
});
export type DetectSpamProbabilityInput = z.infer<typeof DetectSpamProbabilityInputSchema>;

const DetectSpamProbabilityOutputSchema = z.object({
  spamProbability: z.number().describe('The probability (0-1) that the call is spam.'),
  reason: z.string().describe('The reasoning behind the spam probability assessment.'),
});
export type DetectSpamProbabilityOutput = z.infer<typeof DetectSpamProbabilityOutputSchema>;

export async function detectSpamProbability(input: DetectSpamProbabilityInput): Promise<DetectSpamProbabilityOutput> {
  return detectSpamProbabilityFlow(input);
}

const prompt = ai.definePrompt({
  name: 'detectSpamProbabilityPrompt',
  input: {
    schema: z.object({
      callerResponse: z.string().describe('The response from the caller.'),
    }),
  },
  output: {
    schema: z.object({
      spamProbability: z.number().describe('The probability (0-1) that the call is spam.'),
      reason: z.string().describe('The reasoning behind the spam probability assessment.'),
    }),
  },
  prompt: `You are an AI assistant that determines the probability that a phone call is spam, given the caller's response.\n\nAnalyze the following caller response and determine the probability that the call is spam. Provide a probability between 0 and 1.
\nCaller Response: {{{callerResponse}}}\n\nOutput the probability and the reasoning behind your assessment.
`,
});

const detectSpamProbabilityFlow = ai.defineFlow<
  typeof DetectSpamProbabilityInputSchema,
  typeof DetectSpamProbabilityOutputSchema
>({
  name: 'detectSpamProbabilityFlow',
  inputSchema: DetectSpamProbabilityInputSchema,
  outputSchema: DetectSpamProbabilityOutputSchema,
}, async input => {
  const {output} = await prompt(input);
  return output!;
});
