import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Filter } from 'lucide-react';
import { LocationCard } from '@/components/location-card';
import { locations } from '@/lib/mock-data';
import type { Location } from '@/lib/types';
import { PageHeader } from '@/components/layout/header';

export default function Home() {
  const hiddenGems = locations.slice(0, 6);

  return (
    <div className="flex flex-col">
      <div className="w-full bg-card/50">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-8 md:p-12">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-headline text-primary">
              Discover Barcelona,
              <br />
              <span className="text-foreground">Sustainably.</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Explore authentic local spots and avoid the crowds with our AI-powered travel guide.
            </p>
          </div>
          <div className="relative h-64 md:h-80 rounded-lg overflow-hidden shadow-lg">
            <Image
              src="https://placehold.co/600x400.png"
              alt="Map of Barcelona"
              layout="fill"
              objectFit="cover"
              data-ai-hint="barcelona map"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <h2 className="text-2xl font-bold">Interactive Map</h2>
              <p>Find your next adventure.</p>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto p-4 md:p-8">
        <PageHeader 
          title="Hidden Gems"
          description="Local favorites waiting to be discovered."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {hiddenGems.map((location: Location) => (
            <LocationCard key={location.id} location={location} />
          ))}
        </div>
      </main>
    </div>
  );
}
