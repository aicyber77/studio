'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Route, Sparkles, Search } from 'lucide-react';
import { LocationCard } from '@/components/location-card';
import { locations as allLocations } from '@/lib/mock-data';
import type { Location } from '@/lib/types';
import { PageHeader } from '@/components/layout/header';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Input } from '@/components/ui/input';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);

  const hiddenGems = allLocations.filter(location => location.isFeatured);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredLocations(hiddenGems);
    } else {
      const lowercasedFilter = searchTerm.toLowerCase();
      const filtered = allLocations.filter(location =>
        location.name.toLowerCase().includes(lowercasedFilter)
      );
      setFilteredLocations(filtered);
    }
  }, [searchTerm, hiddenGems]);


  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-br from-card to-muted/30">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-8 md:py-20">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-headline text-primary">
              Descubre Barcelona,
              <br />
              <span className="text-foreground">Sosteniblemente.</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl">
              ¿Cansado de las trampas para turistas? Deja que nuestra IA cree un viaje personalizado para ti, revelando las joyas ocultas de la ciudad.
            </p>
            <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/generate-route">
                <Sparkles className="mr-2 h-5 w-5" />
                Crear Mi Ruta
              </Link>
            </Button>
          </div>
          <div className="w-full">
            <Carousel
              className="rounded-lg overflow-hidden shadow-xl"
              opts={{ loop: true }}
            >
              <CarouselContent>
                <CarouselItem>
                  <div className="relative h-80">
                    <Image
                      src="https://placehold.co/600x400.png"
                      alt="Scenic view of Barcelona"
                      fill
                      className="object-cover"
                      data-ai-hint="barcelona sagrada familia"
                    />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="relative h-80">
                    <Image
                      src="https://placehold.co/600x400.png"
                      alt="Charming street in Gothic Quarter"
                      fill
                      className="object-cover"
                      data-ai-hint="barcelona gothic quarter"
                    />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="relative h-80">
                    <Image
                      src="https://placehold.co/600x400.png"
                      alt="Park Guell mosaic"
                      fill
                      className="object-cover"
                      data-ai-hint="barcelona park guell"
                    />
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="absolute left-4 hidden sm:flex" />
              <CarouselNext className="absolute right-4 hidden sm:flex" />
            </Carousel>
          </div>
        </div>
      </div>

      {/* How it Works Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto text-center">
          <PageHeader
            title="Tu Viaje Perfecto en 3 Sencillos Pasos"
            description="Deja que la IA sea tu guía para un viaje inolvidable y sostenible."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 max-w-5xl mx-auto">
            <Card className="text-center bg-card border-none shadow-lg transform transition-transform hover:-translate-y-2">
              <CardHeader>
                <div className="mx-auto bg-primary/10 text-primary p-4 rounded-full w-fit">
                  <Lightbulb className="w-8 h-8" />
                </div>
                <CardTitle className="font-headline text-xl mt-4">1. Comparte Tu Estilo</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Dinos qué te gusta: arte, comida o rincones tranquilos. Define tu ritmo y tolerancia a las multitudes.</p>
              </CardContent>
            </Card>
            <Card className="text-center bg-card border-none shadow-lg transform transition-transform hover:-translate-y-2">
              <CardHeader>
                <div className="mx-auto bg-primary/10 text-primary p-4 rounded-full w-fit">
                  <Route className="w-8 h-8" />
                </div>
                <CardTitle className="font-headline text-xl mt-4">2. Obtén Tu Ruta Personalizada</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Nuestra IA crea un itinerario único para ti, equilibrando tus intereses con joyas ocultas y lugares sostenibles.</p>
              </CardContent>
            </Card>
            <Card className="text-center bg-card border-none shadow-lg transform transition-transform hover:-translate-y-2">
              <CardHeader>
                <div className="mx-auto bg-primary/10 text-primary p-4 rounded-full w-fit">
                  <Sparkles className="w-8 h-8" />
                </div>
                <CardTitle className="font-headline text-xl mt-4">3. Explora y Disfruta</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Descubre Barcelona como un local. Acumula puntos de sostenibilidad y disfruta de un viaje que es verdaderamente tuyo.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <main className="container mx-auto p-4 md:p-8 py-16">
        <PageHeader 
          title={searchTerm ? 'Resultados de la Búsqueda' : 'Joyas Ocultas Destacadas'}
          description={searchTerm ? `Mostrando lugares que coinciden con "${searchTerm}"` : 'Favoritos locales esperando a ser descubiertos.'}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar lugares..."
              className="pl-10 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </PageHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredLocations.length > 0 ? (
            filteredLocations.map((location: Location) => (
              <LocationCard key={location.id} location={location} />
            ))
          ) : (
             <div className="col-span-full text-center py-16">
                <p className="text-muted-foreground">No se encontraron lugares. Intenta con otra búsqueda.</p>
             </div>
          )}
        </div>
      </main>
    </div>
  );
}
