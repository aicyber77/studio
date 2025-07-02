import type { Location, UserProfile, LocationCategory } from './types';

export const locations: Location[] = [
  {
    id: '1',
    name: 'Bunker del Carmel',
    description: 'Panoramic views of the city from a historic anti-aircraft bunker.',
    category: 'parks',
    image: 'https://placehold.co/600x400.png',
    points: 10,
    dataAiHint: 'barcelona viewpoint',
    crowdLevel: 'high',
    position: { lat: 41.4165, lng: 2.1625 }
  },
  {
    id: '2',
    name: 'El Jardí Secret',
    description: 'A quiet, hidden garden cafe perfect for a relaxing afternoon.',
    category: 'restaurants',
    image: 'https://placehold.co/600x400.png',
    points: 15,
    dataAiHint: 'garden cafe',
    crowdLevel: 'low',
    position: { lat: 41.3888, lng: 2.1654 }
  },
  {
    id: '3',
    name: 'Museu de la Xocolata',
    description: 'A museum dedicated to the history of chocolate, with workshops and tastings.',
    category: 'museums',
    image: 'https://placehold.co/600x400.png',
    points: 10,
    dataAiHint: 'chocolate museum',
    crowdLevel: 'medium',
    position: { lat: 41.3861, lng: 2.1818 }
  },
  {
    id: '4',
    name: 'Carrer de Blai',
    description: 'A lively street in Poble-sec famous for its many pinchos bars.',
    category: 'restaurants',
    image: 'https://placehold.co/600x400.png',
    points: 20,
    dataAiHint: 'tapas street',
    crowdLevel: 'high',
    position: { lat: 41.3734, lng: 2.1643 }
  },
  {
    id: '5',
    name: 'Parc del Laberint d\'Horta',
    description: 'The oldest garden in Barcelona, featuring a beautiful hedge maze.',
    category: 'parks',
    image: 'https://placehold.co/600x400.png',
    points: 15,
    dataAiHint: 'hedge maze',
    crowdLevel: 'low',
    position: { lat: 41.441, lng: 2.1465 }
  },
  {
    id: '6',
    name: 'Libreria Altaïr',
    description: 'One of the largest travel bookshops in Europe, a haven for explorers.',
    category: 'shops',
    image: 'https://placehold.co/600x400.png',
    points: 5,
    dataAiHint: 'bookstore interior',
    crowdLevel: 'medium',
    position: { lat: 41.3916, lng: 2.1668 }
  },
];

export const user: UserProfile = {
  name: 'Alex Doe',
  email: 'alex.doe@example.com',
  avatar: 'https://placehold.co/100x100.png',
  preferences: {
    interests: 'parks, history, architecture',
    crowdTolerance: 'low',
    sustainabilityFocused: true,
  },
  visitHistory: [
    { locationId: '5', locationName: 'Parc del Laberint d\'Horta', date: '2023-05-10' },
    { locationId: '3', locationName: 'Museu de la Xocolata', date: '2023-05-12' },
  ],
  sustainabilityPoints: 125,
};
