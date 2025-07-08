import { RouteGenerator } from '@/components/route-generator/route-generator';
import { PageHeader } from '@/components/layout/header';

export const metadata = {
  title: 'Planificador de Rutas con IA | Explore BCN',
  description: 'Crea tu día perfecto en Barcelona con nuestro planificador de rutas con IA.',
};

export default function GenerateRoutePage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <PageHeader
        title="Crea Tu Día Perfecto"
        description="Deja que nuestra IA cree un itinerario único para ti, lejos de las multitudes."
      />
      <div className="mt-8">
        <RouteGenerator />
      </div>
    </div>
  );
}
