'use server';

import {
  generatePersonalizedRoute,
  type GeneratePersonalizedRouteInput,
  type GeneratePersonalizedRouteOutput,
} from '@/ai/flows/generate-personalized-route';
import { z } from 'zod';

const formSchema = z.object({
  interests: z.string().min(3, 'Please tell us at least one interest.'),
  preferences: z.string().min(3, 'Please tell us at least one preference.'),
  crowdTolerance: z.enum(['low', 'medium', 'high']),
  startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter a valid time (HH:MM).'),
  duration: z.string().min(3, 'Please specify a duration.'),
});


export type FormState = {
    message: string;
    fields?: Record<string, string>;
    issues?: string[];
    data?: GeneratePersonalizedRouteOutput;
};


export async function generatePersonalizedRouteAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  
  const rawInput = {
    interests: formData.get('interests'),
    preferences: formData.get('preferences'),
    crowdTolerance: formData.get('crowdTolerance'),
    startTime: formData.get('startTime'),
    duration: formData.get('duration'),
  };
  
  const validatedFields = formSchema.safeParse(rawInput);

  if (!validatedFields.success) {
    const errorResponse = {
      message: "Please correct the errors below.",
      issues: validatedFields.error.flatten().fieldErrors.root,
    };
    return errorResponse;
  }
  
  try {
    const result = await generatePersonalizedRoute(validatedFields.data as GeneratePersonalizedRouteInput);
    return { message: 'Route generated successfully.', data: result };
  } catch (error) {
    console.error(error);
    return { message: 'An unexpected error occurred. Please try again.' };
  }
}
