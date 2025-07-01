'use client';

import Image from 'next/image';
import type { Location } from '@/lib/types';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { MapPin } from 'lucide-react';

interface InteractiveMapProps {
  locations: Location[];
}

const crowdLevelConfig = {
  low: {
    color: 'bg-green-500 border-green-700 text-green-500',
    label: 'Baja',
  },
  medium: {
    color: 'bg-yellow-500 border-yellow-700 text-yellow-500',
    label: 'Media',
  },
  high: {
    color: 'bg-red-500 border-red-700 text-red-500',
    label: 'Alta',
  },
};

export function InteractiveMap({ locations }: InteractiveMapProps) {
  return (
    <TooltipProvider>
      <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-xl border bg-card">
        <Image
          src="https://placehold.co/1200x800.png"
          alt="Map of Barcelona"
          layout="fill"
          objectFit="cover"
          data-ai-hint="barcelona map sketch"
          className="opacity-20"
        />
        
        {locations.map((location) => (
          <Tooltip key={location.id}>
            <TooltipTrigger asChild>
              <div
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{ top: location.position.top, left: location.position.left }}
              >
                <div
                  className={cn(
                    'w-5 h-5 rounded-full border-2 cursor-pointer transition-transform hover:scale-125 flex items-center justify-center animate-pulse',
                    crowdLevelConfig[location.crowdLevel].color
                  )}
                >
                   <div className={cn('w-2 h-2 rounded-full', crowdLevelConfig[location.crowdLevel].color)}></div>
                   <span className="sr-only">{location.name}</span>
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-bold">{location.name}</p>
              <p>Afluencia: <span className="font-medium capitalize">{crowdLevelConfig[location.crowdLevel].label}</span></p>
            </TooltipContent>
          </Tooltip>
        ))}

        <div className="absolute bottom-4 right-4 bg-card/80 backdrop-blur-sm p-3 rounded-lg shadow-lg border">
            <h4 className="text-sm font-bold mb-2">Leyenda</h4>
            <div className="space-y-1 text-xs">
                {Object.entries(crowdLevelConfig).map(([level, {color, label}]) => (
                     <div key={level} className="flex items-center gap-2">
                        <div className={cn("w-3 h-3 rounded-full border", color)}></div>
                        <span>{label}</span>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
