export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      cities: {
        Row: {
          id: number;
          name_ar: string;
          name_en: string;
          created_at: string;
        };
        Insert: {
          id?: number;
          name_ar: string;
          name_en: string;
          created_at?: string;
        };
        Update: {
          id?: number;
          name_ar?: string;
          name_en?: string;
          created_at?: string;
        };
      };
      subscribers: {
        Row: {
          id: string;
          full_name: string;
          email: string;
          phone: string;
          age: number;
          gender: 'male' | 'female';
          city_id: number;
          profile_picture_url: string | null;
          cv_url: string | null;
          is_verified: boolean;
          submitted_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          full_name: string;
          email: string;
          phone: string;
          age: number;
          gender: 'male' | 'female';
          city_id: number;
          profile_picture_url?: string | null;
          cv_url?: string | null;
          is_verified?: boolean;
          submitted_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          email?: string;
          phone?: string;
          age?: number;
          gender?: 'male' | 'female';
          city_id?: number;
          profile_picture_url?: string | null;
          cv_url?: string | null;
          is_verified?: boolean;
          submitted_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      admin_stats: {
        Row: {
          total_subscribers: number;
          male_count: number;
          female_count: number;
          verified_count: number;
          with_photo: number;
          with_cv: number;
          avg_age: number;
          first_submission: string;
          latest_submission: string;
        };
      };
      admin_city_breakdown: {
        Row: {
          name_ar: string;
          name_en: string;
          subscriber_count: number;
        };
      };
    };
    Functions: {
      check_email_exists: {
        Args: { p_email: string };
        Returns: boolean;
      };
      check_phone_exists: {
        Args: { p_phone: string };
        Returns: boolean;
      };
      is_valid_syrian_phone: {
        Args: { p: string };
        Returns: boolean;
      };
    };
    Enums: {
      gender_type: 'male' | 'female';
    };
  };
}
