// This file is machine-generated - do not edit!

'use server';

/**
 * @fileOverview Summarizes the caller's stated reason for calling.
 *
 * - summarizeCallReason - A function that summarizes the caller's stated reason for calling.
 * - SummarizeCallReasonInput - The input type for the summarizeCallReason function.
 * - SummarizeCallReasonOutput - The return type for the summarizeCallReason function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const SummarizeCallReasonInputSchema = z.object({
  callerReason: z.string().describe('The caller\'s stated reason for calling.'),
});
export type SummarizeCallReasonInput = z.infer<typeof SummarizeCallReasonInputSchema>;

const SummarizeCallReasonOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the caller\'s reason for calling.'),
});
export type SummarizeCallReasonOutput = z.infer<typeof SummarizeCallReasonOutputSchema>;

export async function summarizeCallReason(input: SummarizeCallReasonInput): Promise<SummarizeCallReasonOutput> {
  return summarizeCallReasonFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeCallReasonPrompt',
  input: {
    schema: z.object({
      callerReason: z.string().describe('The caller\'s stated reason for calling.'),
    }),
  },
  output: {
    schema: z.object({
      summary: z.string().describe('A concise summary of the caller\'s reason for calling.'),
    }),
  },
  prompt: `Summarize the following reason for calling in a concise manner:\n\n{{{callerReason}}}`,
});

const summarizeCallReasonFlow = ai.defineFlow<
  typeof SummarizeCallReasonInputSchema,
  typeof SummarizeCallReasonOutputSchema
>({
  name: 'summarizeCallReasonFlow',
  inputSchema: SummarizeCallReasonInputSchema,
  outputSchema: SummarizeCallReasonOutputSchema,
},
async input => {
  const {output} = await prompt(input);
  return output!;
});
