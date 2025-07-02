export type LocationCategory = 'restaurants' | 'parks' | 'museums' | 'shops';
export type CrowdLevel = 'low' | 'medium' | 'high';

export interface Location {
  id: string;
  name: string;
  description: string;
  category: LocationCategory;
  image: string;
  points: number;
  dataAiHint: string;
  crowdLevel: CrowdLevel;
  position: {
    lat: number;
    lng: number;
  };
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  preferences: {
    interests: string;
    crowdTolerance: 'low' | 'medium' | 'high';
    sustainabilityFocused: boolean;
  };
  visitHistory: {
    locationId: string;
    locationName: string;
    date: string;
  }[];
  sustainabilityPoints: number;
}
