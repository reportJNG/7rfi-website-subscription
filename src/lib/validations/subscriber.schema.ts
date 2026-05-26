import { z } from 'zod';

const SYRIAN_PHONE_REGEX = /^09[3456789][0-9]{7}$/;

// Base schema with correct types for DB insertion
export const subscriberSchema = z.object({
  full_name: z
    .string()
    .trim()
    .min(3, 'الاسم يجب أن يكون 3 أحرف على الأقل')
    .max(150, 'الاسم طويل جداً'),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .email('البريد الإلكتروني غير صالح'),

  phone: z
    .string()
    .trim()
    .regex(SYRIAN_PHONE_REGEX, 'رقم الهاتف يجب أن يكون رقم سوري صحيح (10 أرقام يبدأ بـ 09)'),

  age: z
    .number({ error: 'العمر يجب أن يكون رقماً' })
    .int()
    .min(15, 'العمر يجب أن يكون 15 سنة أو أكثر')
    .max(80, 'العمر يجب أن يكون 80 سنة أو أقل'),

  gender: z.enum(['male', 'female'], { error: 'يرجى تحديد الجنس' }),

  city_id: z
    .number({ error: 'يرجى اختيار المحافظة' })
    .int()
    .positive('يرجى اختيار محافظة صحيحة'),

  profile_picture_url: z.string().url().optional().nullable(),
  cv_url: z.string().url().optional().nullable(),
});

export type SubscriberFormData = z.infer<typeof subscriberSchema>;

// Form input schema - all string inputs from HTML form
// Age and city_id will be parsed to numbers in the submit handler
export const subscriberFormInputSchema = z.object({
  full_name: z
    .string()
    .trim()
    .min(3, 'الاسم يجب أن يكون 3 أحرف على الأقل')
    .max(150, 'الاسم طويل جداً'),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .email('البريد الإلكتروني غير صالح'),

  phone: z
    .string()
    .trim()
    .regex(SYRIAN_PHONE_REGEX, 'رقم الهاتف يجب أن يكون رقم سوري صحيح (10 أرقام يبدأ بـ 09)'),

  age: z.string().refine(
    (val) => {
      const num = parseInt(val, 10);
      return !isNaN(num) && num >= 15 && num <= 80;
    },
    { message: 'العمر يجب أن يكون بين 15 و 80 سنة' }
  ),

  gender: z.enum(['male', 'female'], { error: 'يرجى تحديد الجنس' }),

  city_id: z.string().refine(
    (val) => {
      const num = parseInt(val, 10);
      return !isNaN(num) && num > 0;
    },
    { message: 'يرجى اختيار محافظة صحيحة' }
  ),

  profile_picture: z
    .instanceof(File)
    .optional()
    .nullable()
    .refine(
      (file) => !file || file.size <= 5 * 1024 * 1024,
      'الصورة يجب أن تكون أقل من 5 ميغابايت'
    )
    .refine(
      (file) => !file || ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
      'صيغة الصورة يجب أن تكون JPG أو PNG أو WebP'
    ),

  cv_file: z
    .instanceof(File)
    .optional()
    .nullable()
    .refine(
      (file) => !file || file.size <= 10 * 1024 * 1024,
      'ملف السيرة الذاتية يجب أن يكون أقل من 10 ميغابايت'
    )
    .refine(
      (file) => !file || file.type === 'application/pdf',
      'السيرة الذاتية يجب أن تكون ملف PDF'
    ),
});

export type SubscriberFormInput = z.infer<typeof subscriberFormInputSchema>;

// Helper to convert form input to subscriber insert
export function parseFormInput(input: SubscriberFormInput) {
  return {
    full_name: input.full_name,
    email: input.email,
    phone: input.phone,
    age: parseInt(input.age, 10),
    gender: input.gender as 'male' | 'female',
    city_id: parseInt(input.city_id, 10),
  };
}
