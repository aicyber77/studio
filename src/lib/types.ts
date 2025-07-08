// Based on "Lugares"
export type LocationCategory =
  | 'nature'
  | 'culture'
  | 'gastronomy'
  | 'shopping'
  | 'leisure';
export type CrowdLevel = 'low' | 'medium' | 'high';

export interface Location {
  id: string;
  name: string;
  description: string;
  position: {
    lat: number;
    lng: number;
  };
  category: LocationCategory;
  crowdLevel: CrowdLevel;
  imageUrl: string;
  tags: string[];
  isFeatured: boolean;
  points: number; // Added this from the old schema as it fits here.
  dataAiHint: string; // Keep this for image generation hints
}

// Based on "Historial de Actividad"
export type ActivityType = 'visit' | 'challenge' | 'redemption';

export interface Activity {
  id: string;
  userId: string;
  activityType: ActivityType;
  date: string; // ISO date string
  detail: {
    // Reference to the item involved in the activity
    id: string;
    name: string;
  };
  points?: number; // Optional points associated with the activity
}

// Based on "Usuarios"
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl: string; // Renamed from avatar
  preferredLanguage: 'en' | 'es' | 'ca';
  points: number; // Renamed from sustainabilityPoints
  level: number;
  activityHistory: Activity[];
  registrationDate: string; // ISO date string
  preferences: {
    // Keeping this structure from old schema as it makes sense.
    interests: string;
    crowdTolerance: 'low' | 'medium' | 'high';
    sustainabilityFocused: boolean;
  };
}
