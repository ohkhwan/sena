// src/ai/flows/transcribe-audio-flow.ts
'use server';
/**
 * @fileOverview Transcribes audio data using an AI model.
 *
 * - transcribeAudio - A function that transcribes audio data.
 * - TranscribeAudioInput - The input type for the transcribeAudio function.
 * - TranscribeAudioOutput - The return type for the transcribeAudio function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const TranscribeAudioInputSchema = z.object({
  audioDataUri: z
    .string()
    .describe(
      "Audio recording of the caller's response, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type TranscribeAudioInput = z.infer<typeof TranscribeAudioInputSchema>;

const TranscribeAudioOutputSchema = z.object({
  transcribedText: z.string().describe('The transcribed text from the audio recording.'),
});
export type TranscribeAudioOutput = z.infer<typeof TranscribeAudioOutputSchema>;

export async function transcribeAudio(input: TranscribeAudioInput): Promise<TranscribeAudioOutput> {
  return transcribeAudioFlow(input);
}

const prompt = ai.definePrompt({
  name: 'transcribeAudioPrompt',
  input: {
    schema: z.object({
      audioDataUri: z
        .string()
        .describe(
          "Audio recording of the caller's response, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
        ),
    }),
  },
  prompt: `Please transcribe the following audio recording accurately. Only provide the transcribed text.
Audio: {{media url=audioDataUri}}`,
});


const transcribeAudioFlow = ai.defineFlow<
  typeof TranscribeAudioInputSchema,
  typeof TranscribeAudioOutputSchema
>({
  name: 'transcribeAudioFlow',
  inputSchema: TranscribeAudioInputSchema,
  outputSchema: TranscribeAudioOutputSchema,
}, async (input) => {
    const response = await prompt(input);
    const transcribedText = response.text ?? ''; // Use response.text for 1.x

  return { transcribedText };
});
