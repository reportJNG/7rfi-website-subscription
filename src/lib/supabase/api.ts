import { getSupabaseClient } from './client';
import type { City, SubscriberInsert } from '@/types';

const PROFILE_FILE_TYPES: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};
const PROFILE_MAX_SIZE = 5 * 1024 * 1024;
const CV_MAX_SIZE = 10 * 1024 * 1024;

// Fetch all cities
export async function getCities(): Promise<City[]> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('cities')
    .select('*')
    .order('id');

  if (error) throw new Error(error.message);
  return (data as City[]) || [];
}

// Check if email already exists
export async function checkEmailExists(email: string): Promise<boolean> {
  const supabase = getSupabaseClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase.rpc as any)('check_email_exists', { p_email: email });

  if (error) throw new Error(error.message);
  return !!data;
}

// Check if phone already exists
export async function checkPhoneExists(phone: string): Promise<boolean> {
  const supabase = getSupabaseClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase.rpc as any)('check_phone_exists', { p_phone: phone });

  if (error) throw new Error(error.message);
  return !!data;
}

// Insert a new subscriber
export async function insertSubscriber(data: SubscriberInsert): Promise<void> {
  const supabase = getSupabaseClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase.from('subscribers').insert as any)(data);

  if (error) {
    // Handle unique constraint violations
    if (error.code === '23505') {
      const isEmail = error.message.includes('email') || error.message.includes('Email');
      throw new Error(
        isEmail
          ? 'هذا البريد الإلكتروني مسجل مسبقاً'
          : 'رقم الهاتف مسجل مسبقاً'
      );
    }
    throw new Error('حدث خطأ أثناء التسجيل، يرجى المحاولة لاحقاً');
  }
}

// Get total subscriber count
export async function getSubscriberCount(): Promise<number> {
  const supabase = getSupabaseClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase.from('admin_stats').select('total_subscribers').single as any)();

  if (error) {
    console.warn('Failed to get subscriber count:', error);
    return 0;
  }
  return data?.total_subscribers || 0;
}

// Upload profile picture
export async function uploadProfilePicture(file: File, userId: string): Promise<string> {
  const supabase = getSupabaseClient();
  const fileExt = PROFILE_FILE_TYPES[file.type];

  if (!fileExt) {
    throw new Error('صيغة الصورة يجب أن تكون JPG أو PNG أو WebP');
  }
  if (file.size > PROFILE_MAX_SIZE) {
    throw new Error('الصورة يجب أن تكون أقل من 5 ميغابايت');
  }

  const fileName = `${userId}_${Date.now()}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from('profile-pictures')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (uploadError) {
    throw new Error('فشل رفع الصورة: ' + uploadError.message);
  }

  const { data } = supabase.storage
    .from('profile-pictures')
    .getPublicUrl(fileName);

  return data.publicUrl;
}

// Upload CV
export async function uploadCV(file: File, userId: string): Promise<string> {
  const supabase = getSupabaseClient();

  if (file.type !== 'application/pdf') {
    throw new Error('السيرة الذاتية يجب أن تكون ملف PDF');
  }
  if (file.size > CV_MAX_SIZE) {
    throw new Error('ملف السيرة الذاتية يجب أن يكون أقل من 10 ميغابايت');
  }

  const fileName = `${userId}_${Date.now()}.pdf`;

  const { error: uploadError } = await supabase.storage
    .from('cvs')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (uploadError) {
    throw new Error('فشل رفع السيرة الذاتية: ' + uploadError.message);
  }

  const { data } = supabase.storage
    .from('cvs')
    .getPublicUrl(fileName);

  return data.publicUrl;
}
