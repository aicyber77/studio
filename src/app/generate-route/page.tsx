import { RouteGenerator } from '@/components/route-generator/route-generator';
import { PageHeader } from '@/components/layout/header';
import { Sparkles } from 'lucide-react';

export const metadata = {
  title: 'AI Route Planner | Explore BCN',
  description: 'Create your perfect day in Barcelona with our AI-powered route planner.',
};

export default function GenerateRoutePage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <PageHeader
        title="Create Your Perfect Day"
        description="Let our AI craft a unique itinerary for you, away from the crowds."
      />
      <div className="mt-8">
        <RouteGenerator />
      </div>
    </div>
  );
}
