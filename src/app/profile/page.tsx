import { PageHeader } from '@/components/layout/header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { user, locations } from '@/lib/mock-data';
import { format } from 'date-fns';
import { Award, Leaf, MapPin, UserCheck } from 'lucide-react';
import { SustainabilityChart } from '@/components/profile/sustainability-chart';

export const metadata = {
  title: 'Your Profile | Explore BCN',
  description: 'View your preferences, visit history, and sustainability score.',
};

export default function ProfilePage() {
  const visitHistoryWithDetails = user.visitHistory.map(visit => {
    const locationDetails = locations.find(loc => loc.id === visit.locationId);
    return {
      ...visit,
      category: locationDetails?.category || 'N/A',
      points: locationDetails?.points || 0,
    };
  });

  const chartData = visitHistoryWithDetails.map(visit => ({
    date: format(new Date(visit.date), 'MMM d'),
    points: visit.points,
  }));

  return (
    <div className="container mx-auto p-4 md:p-8">
      <PageHeader
        title="Your Profile"
        description="Your sustainable journey through Barcelona."
      />

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1 space-y-8">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="font-headline text-2xl">{user.name}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
              </div>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline">
                <UserCheck className="w-5 h-5" /> Your Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Interests</span>
                <span className="font-medium capitalize">{user.preferences.interests}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Crowd Tolerance</span>
                <span className="font-medium capitalize">{user.preferences.crowdTolerance}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Sustainability Focus</span>
                <span className="font-medium">
                  {user.preferences.sustainabilityFocused ? (
                    <Leaf className="w-5 h-5 text-green-500" />
                  ) : (
                    'No'
                  )}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline">
                <Award className="w-5 h-5" /> Sustainability Score
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <p className="text-6xl font-bold text-primary">{user.sustainabilityPoints}</p>
                <p className="text-muted-foreground">Total Points Earned</p>
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Level 2: Eco-Explorer</p>
                <Progress value={(user.sustainabilityPoints % 200) / 2} />
                <p className="text-xs text-muted-foreground mt-1 text-right">{(200 - user.sustainabilityPoints % 200)} points to next level</p>
              </div>
              <SustainabilityChart data={chartData} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline">
                <MapPin className="w-5 h-5" /> Visit History
              </CardTitle>
              <CardDescription>
                The sustainable places you've explored.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Location</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Points</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {visitHistoryWithDetails.length > 0 ? visitHistoryWithDetails.map((visit) => (
                    <TableRow key={visit.locationId}>
                      <TableCell className="font-medium">{visit.locationName}</TableCell>
                      <TableCell className="capitalize">{visit.category}</TableCell>
                      <TableCell>{format(new Date(visit.date), 'PPP')}</TableCell>
                      <TableCell className="text-right font-bold text-primary">+{visit.points}</TableCell>
                    </TableRow>
                  )) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-muted-foreground">No visits yet. Go explore!</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
