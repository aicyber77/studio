import { PageHeader } from '@/components/layout/header';
import { InteractiveMap } from '@/components/map/interactive-map';
import { locations } from '@/lib/mock-data';

export const metadata = {
  title: 'Mapa de Afluencia | Explore BCN',
  description: 'Consulta los niveles de afluencia en tiempo real en los lugares populares de Barcelona.',
};

export default function MapPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <PageHeader
        title="Mapa de Afluencia en Vivo"
        description="Encuentra los lugares más tranquilos para explorar ahora mismo."
      />
      <div className="mt-8">
        <InteractiveMap locations={locations} />
      </div>
    </div>
  );
}
