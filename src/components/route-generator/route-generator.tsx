'use client';

import { useState } from 'react';
import { useFormState } from 'react-dom';
import { RouteForm } from './route-form';
import { RouteDisplay } from './route-display';
import { generatePersonalizedRouteAction, type FormState } from '@/app/actions';
import { Card, CardContent } from '../ui/card';
import { Skeleton } from '../ui/skeleton';
import { AlertTriangle, Map, Route } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

const initialState: FormState = {
  message: '',
};

export function RouteGenerator() {
  const [formState, formAction] = useFormState(generatePersonalizedRouteAction, initialState);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
      <div className="md:col-span-2">
        <RouteForm formAction={formAction} formState={formState}/>
      </div>
      <div className="md:col-span-3">
         <RouteDisplay serverState={formState} />
      </div>
    </div>
  );
}

function RouteDisplay({ serverState }: { serverState: FormState }) {
  const { data, message } = serverState;

  if (!data && message === '') {
    return (
      <Card className="h-full min-h-[400px] flex flex-col items-center justify-center p-8 text-center bg-muted/50 border-dashed">
        <Route className="h-16 w-16 text-muted-foreground/50 mb-4" />
        <h3 className="text-xl font-headline text-muted-foreground">Your Personalized Route Awaits</h3>
        <p className="text-muted-foreground mt-2">Fill out the form to generate your custom itinerary.</p>
      </Card>
    );
  }

  if (message && !data) {
     return (
       <Card className="h-full min-h-[400px] flex flex-col items-center justify-center p-8 text-center bg-destructive/10 border-dashed border-destructive/50">
        <AlertTriangle className="h-16 w-16 text-destructive mb-4" />
        <h3 className="text-xl font-headline text-destructive">Oops! Something went wrong.</h3>
        <p className="text-destructive/80 mt-2">{message}</p>
      </Card>
     )
  }

  if (data) {
    return (
       <Card className="bg-gradient-to-br from-card to-muted/30">
        <CardContent className="p-6">
          <h3 className="text-2xl font-headline text-primary mb-4">Your Custom Itinerary</h3>
          <div className="space-y-6">
              <div>
                  <h4 className="font-bold text-lg mb-2">Route Overview</h4>
                  <p className="text-muted-foreground">{data.routeDescription}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-background/50 p-3 rounded-lg">
                      <p className="font-semibold text-muted-foreground">Total Duration</p>
                      <p className="text-lg font-bold">{data.totalDuration}</p>
                  </div>
                  <div className="bg-background/50 p-3 rounded-lg">
                      <p className="font-semibold text-muted-foreground">Crowd Levels</p>
                      <p className="text-lg font-bold capitalize">{data.crowdEstimate}</p>
                  </div>
              </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
}
