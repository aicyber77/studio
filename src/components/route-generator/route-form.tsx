'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Wand2, LoaderCircle } from 'lucide-react';
import type { FormState } from '@/app/actions';

interface RouteFormProps {
    formAction: (payload: FormData) => void;
    formState: FormState;
}

export function RouteForm({ formAction, formState }: RouteFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Plan Your Trip</CardTitle>
        <CardDescription>Tell us your preferences, and we'll handle the rest.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="interests">What are your interests?</Label>
            <Input id="interests" name="interests" placeholder="e.g., museums, parks, restaurants" required />
            {formState.issues && <p className="text-sm text-destructive">{formState.issues.join(', ')}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="preferences">Any specific preferences?</Label>
            <Textarea id="preferences" name="preferences" placeholder="e.g., quiet places, historical sites, modern art" required />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="crowd-tolerance">Crowd Tolerance</Label>
              <Select name="crowdTolerance" defaultValue="low" required>
                <SelectTrigger id="crowd-tolerance">
                  <SelectValue placeholder="Select tolerance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="start-time">Start Time</Label>
              <Input id="start-time" name="startTime" type="time" defaultValue="09:00" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Desired Duration</Label>
            <Input id="duration" name="duration" placeholder="e.g., 2-3 hours, half a day" required />
          </div>

          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
}

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={pending} aria-disabled={pending}>
            {pending ? (
                <>
                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                </>
            ) : (
                <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Generate Route
                </>
            )}
        </Button>
    )
}
