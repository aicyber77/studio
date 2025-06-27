'use server';

/**
 * @fileOverview An AI agent that generates personalized routes for exploring Barcelona,
 *  avoiding crowded areas based on user preferences and integrating sustainability initiatives.
 *  It now incorporates a tool to fetch real-time crowd data.
 *
 * - generatePersonalizedRoute - A function that generates personalized route recommendations.
 * - GeneratePersonalizedRouteInput - The input type for the generatePersonalizedRoute function.
 * - GeneratePersonalizedRouteOutput - The return type for the generatePersonalizedRoute function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePersonalizedRouteInputSchema = z.object({
  interests: z
    .string()
    .describe(
      'A comma-separated list of the user\u2019s interests (e.g., museums, parks, restaurants).'
    ),
  preferences: z
    .string()
    .describe(
      'A comma-separated list of the user\u2019s preferences (e.g., quiet, historical, modern).'
    ),
  crowdTolerance: z
    .string()
    .describe(
      'The user\u2019s tolerance for crowds (e.g., low, medium, high).'
    ),
  startTime: z
    .string()
    .describe(
      'The time when the user wants to start the route (e.g., 9:00 AM).'
    ),
  duration: z
    .string()
    .describe('The desired duration of the route (e.g., 2-3 hours).'),
});

export type GeneratePersonalizedRouteInput = z.infer<
  typeof GeneratePersonalizedRouteInputSchema
>;

const GeneratePersonalizedRouteOutputSchema = z.object({
  routeDescription: z
    .string()
    .describe(
      'A detailed description of the personalized route, including specific locations, estimated time at each location, and transportation suggestions.'
    ),
  totalDuration: z
    .string()
    .describe('The estimated total duration of the route.'),
  crowdEstimate: z
    .string()
    .describe(
      'An estimate of the crowd levels at different points along the route.'
    ),
  sustainabilityPoints: z
    .string()
    .describe(
      'An estimate of the sustainability points earned by the route.'
    ),
});

export type GeneratePersonalizedRouteOutput = z.infer<
  typeof GeneratePersonalizedRouteOutputSchema
>;

async function getCrowdData(location: string): Promise<string> {
  // Placeholder implementation for fetching crowd data.  Replace with actual API call.
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network latency
  return `Crowd levels for ${location} are estimated to be moderate.`;
}

const crowdDataSource = ai.defineTool({
  name: 'getCrowdData',
  description: 'Retrieves real-time crowd data for a specific location in Barcelona.',
  inputSchema: z.object({
    location: z.string().describe('The name of the location to check.'),
  }),
  outputSchema: z.string().describe('A description of the crowd levels at the location.'),
}, async (input) => {
  return getCrowdData(input.location);
});

export async function generatePersonalizedRoute(
  input: GeneratePersonalizedRouteInput
): Promise<GeneratePersonalizedRouteOutput> {
  return generatePersonalizedRouteFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePersonalizedRoutePrompt',
  input: {schema: GeneratePersonalizedRouteInputSchema},
  output: {schema: GeneratePersonalizedRouteOutputSchema},
  tools: [crowdDataSource],
  prompt: `You are an expert travel guide for Barcelona, specializing in creating personalized and sustainable routes for tourists.

You will generate a personalized route for the user based on their interests, preferences, crowd tolerance, start time and duration. You will use the getCrowdData tool to determine crowd levels at various locations.

Interests: {{{interests}}}
Preferences: {{{preferences}}}
Crowd Tolerance: {{{crowdTolerance}}}
Start Time: {{{startTime}}}
Duration: {{{duration}}}

Consider the current tourist flow and public transportation schedules to avoid crowded areas and provide accurate transportation suggestions.  Also, suggest alternative locations that are less crowded.

Calculate and include an estimate of sustainability points earned based on the selected locations and transportation methods.  Assume that walking and public transportation earn more points than private transportation.

The route should include specific locations, estimated time at each location, crowd levels (using the getCrowdData tool), and transportation suggestions. It should also respect user's preferences for duration and tolerance for crowds.
`,
});

const generatePersonalizedRouteFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedRouteFlow',
    inputSchema: GeneratePersonalizedRouteInputSchema,
    outputSchema: GeneratePersonalizedRouteOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
