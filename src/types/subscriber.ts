export type Gender = 'male' | 'female';

export interface Subscriber {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  age: number;
  gender: Gender;
  city_id: number;
  profile_picture_url: string | null;
  cv_url: string | null;
  is_verified: boolean;
  submitted_at: string;
  updated_at: string;
}

export interface SubscriberInsert {
  full_name: string;
  email: string;
  phone: string;
  age: number;
  gender: Gender;
  city_id: number;
  profile_picture_url?: string | null;
  cv_url?: string | null;
}
