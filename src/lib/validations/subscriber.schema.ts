import { z } from 'zod';

const SYRIAN_PHONE_REGEX = /^09[3456789][0-9]{7}$/;
const PERSON_NAME_REGEX = /^[\p{L}\p{M}][\p{L}\p{M}\s'-]{1,148}[\p{L}\p{M}]$/u;
const PERSON_NAME_MESSAGE = 'الاسم يجب أن يحتوي على أحرف فقط بدون رموز أو أرقام';

export const subscriberSchema = z.object({
  full_name: z
    .string()
    .trim()
    .min(3, 'الاسم يجب أن يكون 3 أحرف على الأقل')
    .max(150, 'الاسم طويل جداً')
    .regex(PERSON_NAME_REGEX, PERSON_NAME_MESSAGE),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .max(254, 'البريد الإلكتروني طويل جداً')
    .email('البريد الإلكتروني غير صالح'),

  phone: z
    .string()
    .trim()
    .regex(SYRIAN_PHONE_REGEX, 'رقم الهاتف يجب أن يكون رقماً سورياً صحيحاً من 10 أرقام ويبدأ بـ 09'),

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

export const subscriberFormInputSchema = z.object({
  full_name: z
    .string()
    .trim()
    .min(3, 'الاسم يجب أن يكون 3 أحرف على الأقل')
    .max(150, 'الاسم طويل جداً')
    .regex(PERSON_NAME_REGEX, PERSON_NAME_MESSAGE),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .max(254, 'البريد الإلكتروني طويل جداً')
    .email('البريد الإلكتروني غير صالح'),

  phone: z
    .string()
    .trim()
    .regex(SYRIAN_PHONE_REGEX, 'رقم الهاتف يجب أن يكون رقماً سورياً صحيحاً من 10 أرقام ويبدأ بـ 09'),

  age: z.string().refine(
    (value) => {
      const number = Number(value);
      return Number.isInteger(number) && number >= 15 && number <= 80;
    },
    { message: 'العمر يجب أن يكون بين 15 و 80 سنة' },
  ),

  gender: z.enum(['male', 'female'], { error: 'يرجى تحديد الجنس' }),

  city_id: z.string().refine(
    (value) => {
      const number = Number(value);
      return Number.isInteger(number) && number > 0;
    },
    { message: 'يرجى اختيار محافظة صحيحة' },
  ),

  profile_picture: z
    .instanceof(File)
    .optional()
    .nullable()
    .refine((file) => !file || file.size <= 5 * 1024 * 1024, 'الصورة يجب أن تكون أقل من 5 ميغابايت')
    .refine(
      (file) => !file || ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
      'صيغة الصورة يجب أن تكون JPG أو PNG أو WebP',
    ),

  cv_file: z
    .instanceof(File)
    .optional()
    .nullable()
    .refine((file) => !file || file.size <= 10 * 1024 * 1024, 'ملف السيرة الذاتية يجب أن يكون أقل من 10 ميغابايت')
    .refine((file) => !file || file.type === 'application/pdf', 'السيرة الذاتية يجب أن تكون ملف PDF'),
});

export type SubscriberFormInput = z.infer<typeof subscriberFormInputSchema>;

export function parseFormInput(input: SubscriberFormInput) {
  return {
    full_name: input.full_name,
    email: input.email,
    phone: input.phone,
    age: Number(input.age),
    gender: input.gender as 'male' | 'female',
    city_id: Number(input.city_id),
  };
}
