import Image from 'next/image';
import type { Location } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Leaf, PlusCircle } from 'lucide-react';

interface LocationCardProps {
  location: Location;
}

export function LocationCard({ location }: LocationCardProps) {
  return (
    <Card className="overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={location.imageUrl}
            alt={location.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={location.dataAiHint}
          />
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="capitalize bg-white/80 backdrop-blur-sm">
              {location.category}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-xl font-headline mb-2">{location.name}</CardTitle>
        <p className="text-muted-foreground text-sm line-clamp-2">{location.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4 bg-muted/50">
        <div className="flex items-center gap-2 text-primary">
          <Leaf className="w-5 h-5" />
          <span className="font-bold text-sm">{location.points} Points</span>
        </div>
        <Button size="sm" variant="outline">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add to route
        </Button>
      </CardFooter>
    </Card>
  );
}
