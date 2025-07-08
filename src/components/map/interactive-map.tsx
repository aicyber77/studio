'use client';

import { useState } from 'react';
import type { Location } from '@/lib/types';
import { cn } from '@/lib/utils';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
  Pin,
} from '@vis.gl/react-google-maps';
import { Badge } from '../ui/badge';
import { Leaf } from 'lucide-react';

interface InteractiveMapProps {
  locations: Location[];
}

const crowdLevelConfig = {
  low: {
    color: '#22c55e', // green-500
    label: 'Baja',
  },
  medium: {
    color: '#eab308', // yellow-500
    label: 'Media',
  },
  high: {
    color: '#ef4444', // red-500
    label: 'Alta',
  },
};

export function InteractiveMap({ locations }: InteractiveMapProps) {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') {
    return (
      <div className="flex items-center justify-center h-96 bg-muted rounded-lg aspect-video">
        <p className="text-muted-foreground text-center p-4">
          La clave de API de Google Maps no está configurada. Por favor, añádela a tu fichero .env para ver el mapa.
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-xl border bg-card">
      <APIProvider apiKey={apiKey}>
        <Map
          defaultCenter={{ lat: 41.3851, lng: 2.1734 }}
          defaultZoom={13}
          mapId="barcelona-map"
          gestureHandling={'greedy'}
          disableDefaultUI={true}
        >
          {locations.map((location) => (
            <AdvancedMarker
              key={location.id}
              position={location.position}
              onClick={() => setSelectedLocation(location)}
            >
              <Pin
                background={crowdLevelConfig[location.crowdLevel].color}
                borderColor={'#fff'}
                glyphColor={'#fff'}
              />
            </AdvancedMarker>
          ))}

          {selectedLocation && (
            <InfoWindow
              position={selectedLocation.position}
              onCloseClick={() => setSelectedLocation(null)}
              minWidth={250}
              headerDisabled
            >
              <div className="p-1 font-sans">
                <h3 className="font-bold text-base mb-1">{selectedLocation.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{selectedLocation.description}</p>
                <div className="flex justify-between items-center mt-3">
                   <Badge variant="secondary" className="capitalize">
                      Afluencia: {crowdLevelConfig[selectedLocation.crowdLevel].label}
                    </Badge>
                   <div className="flex items-center gap-1 text-primary">
                      <Leaf className="w-4 h-4" />
                      <span className="font-bold text-sm">{selectedLocation.points} Puntos</span>
                    </div>
                </div>
              </div>
            </InfoWindow>
          )}
        </Map>
      </APIProvider>

        <div className="absolute bottom-4 right-4 bg-card/80 backdrop-blur-sm p-3 rounded-lg shadow-lg border">
            <h4 className="text-sm font-bold mb-2">Leyenda de Afluencia</h4>
            <div className="space-y-1 text-xs">
                {Object.entries(crowdLevelConfig).map(([level, {color, label}]) => (
                     <div key={level} className="flex items-center gap-2">
                        <div style={{backgroundColor: color}} className="w-3 h-3 rounded-full border border-white/50"></div>
                        <span>{label}</span>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
}
