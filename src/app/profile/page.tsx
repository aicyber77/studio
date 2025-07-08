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
  title: 'Tu Perfil | Explore BCN',
  description: 'Consulta tus preferencias, historial de visitas y puntuación de sostenibilidad.',
};

export default function ProfilePage() {
    const visitHistory = user.activityHistory.filter(
    (activity) => activity.activityType === 'visit'
  );

  const visitHistoryWithDetails = visitHistory.map(activity => {
    const locationDetails = locations.find(loc => loc.id === activity.detail.id);
    return {
      ...activity,
      category: locationDetails?.category || 'N/A',
    };
  });

  const chartData = user.activityHistory
    .filter(activity => activity.points && activity.points > 0)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map(activity => ({
      date: format(new Date(activity.date), 'MMM d'),
      points: activity.points!,
    }));

  return (
    <div className="container mx-auto p-4 md:p-8">
      <PageHeader
        title="Tu Perfil"
        description="Tu viaje sostenible por Barcelona."
      />

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1 space-y-8">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={user.avatarUrl} alt={user.name} />
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
                <UserCheck className="w-5 h-5" /> Tus Preferencias
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Intereses</span>
                <span className="font-medium capitalize">{user.preferences.interests}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tolerancia a Multitudes</span>
                <span className="font-medium capitalize">{user.preferences.crowdTolerance}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Enfoque Sostenible</span>
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
                <Award className="w-5 h-5" /> Puntuación de Sostenibilidad
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <p className="text-6xl font-bold text-primary">{user.points}</p>
                <p className="text-muted-foreground">Puntos Totales Obtenidos</p>
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Nivel {user.level}: Eco-Explorador</p>
                <Progress value={(user.points % 200) / 2} />
                <p className="text-xs text-muted-foreground mt-1 text-right">{(200 - user.points % 200)} puntos para el siguiente nivel</p>
              </div>
              <SustainabilityChart data={chartData} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline">
                <MapPin className="w-5 h-5" /> Historial de Visitas
              </CardTitle>
              <CardDescription>
                Los lugares sostenibles que has explorado.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Lugar</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead className="text-right">Puntos</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {visitHistoryWithDetails.length > 0 ? visitHistoryWithDetails.map((activity) => (
                    <TableRow key={activity.id}>
                      <TableCell className="font-medium">{activity.detail.name}</TableCell>
                      <TableCell className="capitalize">{activity.category}</TableCell>
                      <TableCell>{format(new Date(activity.date), 'PPP')}</TableCell>
                      <TableCell className="text-right font-bold text-primary">+{activity.points}</TableCell>
                    </TableRow>
                  )) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-muted-foreground">Aún no hay visitas. ¡Sal a explorar!</TableCell>
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
