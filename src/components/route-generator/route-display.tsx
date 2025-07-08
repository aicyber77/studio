'use client';

import type { FormState } from '@/app/actions';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, Leaf, Route } from 'lucide-react';

export function RouteDisplay({ serverState }: { serverState: FormState }) {
  const { data, message } = serverState;

  if (!data && message === '') {
    return (
      <Card className="h-full min-h-[400px] flex flex-col items-center justify-center p-8 text-center bg-muted/50 border-dashed">
        <Route className="h-16 w-16 text-muted-foreground/50 mb-4" />
        <h3 className="text-xl font-headline text-muted-foreground">Tu Ruta Personalizada te Espera</h3>
        <p className="text-muted-foreground mt-2">Rellena el formulario para generar tu itinerario.</p>
      </Card>
    );
  }

  if (message && !data) {
     return (
       <Card className="h-full min-h-[400px] flex flex-col items-center justify-center p-8 text-center bg-destructive/10 border-dashed border-destructive/50">
        <AlertTriangle className="h-16 w-16 text-destructive mb-4" />
        <h3 className="text-xl font-headline text-destructive">¡Ups! Algo salió mal.</h3>
        <p className="text-destructive/80 mt-2">{message}</p>
      </Card>
     )
  }

  if (data) {
    return (
       <Card className="bg-gradient-to-br from-card to-muted/30">
        <CardContent className="p-6">
          <h3 className="text-2xl font-headline text-primary mb-4">Tu Itinerario Personalizado</h3>
          <div className="space-y-6">
              <div>
                  <h4 className="font-bold text-lg mb-2">Resumen de la Ruta</h4>
                  <p className="text-muted-foreground">{data.routeDescription}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="bg-background/50 p-3 rounded-lg">
                      <p className="font-semibold text-muted-foreground">Duración Total</p>
                      <p className="text-lg font-bold">{data.totalDuration}</p>
                  </div>
                  <div className="bg-background/50 p-3 rounded-lg">
                      <p className="font-semibold text-muted-foreground">Niveles de Afluencia</p>
                      <p className="text-lg font-bold capitalize">{data.crowdEstimate}</p>
                  </div>
                  <div className="bg-background/50 p-3 rounded-lg sm:col-span-2">
                    <div className="flex items-center gap-2">
                      <Leaf className="w-4 h-4 text-primary" />
                      <p className="font-semibold text-muted-foreground">Puntos de Sostenibilidad</p>
                    </div>
                    <p className="text-lg font-bold">{data.sustainabilityPoints}</p>
                  </div>
              </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
}
