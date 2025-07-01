import { PageHeader } from '@/components/layout/header';
import { InteractiveMap } from '@/components/map/interactive-map';
import { locations } from '@/lib/mock-data';

export const metadata = {
  title: 'Live Crowd Map | Explore BCN',
  description: 'See real-time crowd levels at popular spots in Barcelona.',
};

export default function MapPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <PageHeader
        title="Live Crowd Map"
        description="Find the quietest spots to explore right now."
      />
      <div className="mt-8">
        <InteractiveMap locations={locations} />
      </div>
    </div>
  );
}
