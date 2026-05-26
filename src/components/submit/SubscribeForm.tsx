import { useState, useRef, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Upload, X, FileText, Loader2 } from 'lucide-react';
import { subscriberFormInputSchema, parseFormInput } from '@/lib/validations/subscriber.schema';
import type { SubscriberFormInput } from '@/lib/validations/subscriber.schema';
import type { City } from '@/types';
import { checkEmailExists, checkPhoneExists, insertSubscriber, uploadProfilePicture, uploadCV } from '@/lib/supabase/api';
import { SuccessCard } from '@/components/shared/SuccessCard';

interface SubscribeFormProps {
  cities: City[];
}

export function SubscribeForm({ cities }: SubscribeFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [cvFileName, setCvFileName] = useState<string | null>(null);

  const profileInputRef = useRef<HTMLInputElement>(null);
  const cvInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SubscriberFormInput>({
    resolver: zodResolver(subscriberFormInputSchema),
    defaultValues: {
      full_name: '',
      email: '',
      phone: '',
      age: '',
      gender: '' as never,
      city_id: '',
      profile_picture: null,
      cv_file: null,
    },
  });

  const genderValue = watch('gender');
  const cityValue = watch('city_id');

  const handleProfilePictureChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue('profile_picture', file as unknown as File);
      const reader = new FileReader();
      reader.onloadend = () => setProfilePreview(reader.result as string);
      reader.readAsDataURL(file);
      clearErrors('profile_picture');
    }
  }, [setValue, clearErrors]);

  const handleCVChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue('cv_file', file as unknown as File);
      setCvFileName(file.name);
      clearErrors('cv_file');
    }
  }, [setValue, clearErrors]);

  const removeProfilePicture = () => {
    setValue('profile_picture', null);
    setProfilePreview(null);
    if (profileInputRef.current) profileInputRef.current.value = '';
  };

  const removeCV = () => {
    setValue('cv_file', null);
    setCvFileName(null);
    if (cvInputRef.current) cvInputRef.current.value = '';
  };

  const onSubmit = async (formData: SubscriberFormInput) => {
    setIsSubmitting(true);
    setGeneralError(null);

    try {
      // 1. Check email duplicate
      const emailExists = await checkEmailExists(formData.email);
      if (emailExists) {
        setError('email', { message: 'هذا البريد الإلكتروني مسجل مسبقاً' });
        setIsSubmitting(false);
        return;
      }

      // 2. Check phone duplicate
      const phoneExists = await checkPhoneExists(formData.phone);
      if (phoneExists) {
        setError('phone', { message: 'رقم الهاتف مسجل مسبقاً' });
        setIsSubmitting(false);
        return;
      }

      let profilePictureUrl: string | null = null;
      let cvUrl: string | null = null;
      const userId = crypto.randomUUID();

      // 3. Upload profile picture if provided
      if (formData.profile_picture instanceof File) {
        try {
          profilePictureUrl = await uploadProfilePicture(formData.profile_picture, userId);
        } catch (err) {
          setGeneralError(err instanceof Error ? err.message : 'فشل رفع الصورة الشخصية');
          setIsSubmitting(false);
          return;
        }
      }

      // 4. Upload CV if provided
      if (formData.cv_file instanceof File) {
        try {
          cvUrl = await uploadCV(formData.cv_file, userId);
        } catch (err) {
          setGeneralError(err instanceof Error ? err.message : 'فشل رفع السيرة الذاتية');
          setIsSubmitting(false);
          return;
        }
      }

      // 5. Parse and insert subscriber
      const parsed = parseFormInput(formData);
      await insertSubscriber({
        ...parsed,
        profile_picture_url: profilePictureUrl,
        cv_url: cvUrl,
      });

      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setGeneralError(err instanceof Error ? err.message : 'حدث خطأ أثناء التسجيل، يرجى المحاولة لاحقاً');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return <SuccessCard />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Full Name */}
      <div>
        <label className="block font-noto font-medium text-sm text-navy mb-2">
          الاسم الكامل <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          placeholder="محمد أحمد"
          {...register('full_name')}
          className={`harafi-input w-full ${errors.full_name ? 'harafi-input-error' : ''}`}
          disabled={isSubmitting}
        />
        {errors.full_name && (
          <p className="text-danger text-[13px] mt-1.5 font-noto">{String(errors.full_name.message)}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block font-noto font-medium text-sm text-navy mb-2">
          البريد الإلكتروني <span className="text-danger">*</span>
        </label>
        <input
          type="email"
          placeholder="example@email.com"
          dir="ltr"
          {...register('email')}
          className={`harafi-input w-full text-left ${errors.email ? 'harafi-input-error' : ''}`}
          disabled={isSubmitting}
        />
        {errors.email && (
          <p className="text-danger text-[13px] mt-1.5 font-noto">{String(errors.email.message)}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label className="block font-noto font-medium text-sm text-navy mb-2">
          رقم الهاتف <span className="text-danger">*</span>
        </label>
        <input
          type="tel"
          placeholder="09XXXXXXXX"
          dir="ltr"
          {...register('phone')}
          className={`harafi-input w-full text-left ${errors.phone ? 'harafi-input-error' : ''}`}
          disabled={isSubmitting}
        />
        {errors.phone && (
          <p className="text-danger text-[13px] mt-1.5 font-noto">{String(errors.phone.message)}</p>
        )}
      </div>

      {/* Age */}
      <div>
        <label className="block font-noto font-medium text-sm text-navy mb-2">
          العمر <span className="text-danger">*</span>
        </label>
        <input
          type="number"
          placeholder="25"
          min={15}
          max={80}
          {...register('age')}
          className={`harafi-input w-full ${errors.age ? 'harafi-input-error' : ''}`}
          disabled={isSubmitting}
        />
        {errors.age && (
          <p className="text-danger text-[13px] mt-1.5 font-noto">{String(errors.age.message)}</p>
        )}
      </div>

      {/* Gender */}
      <div>
        <label className="block font-noto font-medium text-sm text-navy mb-3">
          الجنس <span className="text-danger">*</span>
        </label>
        <div className="flex gap-4">
          {[
            { value: 'male', label: 'ذكر' },
            { value: 'female', label: 'أنثى' },
          ].map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                setValue('gender', option.value as never, { shouldValidate: true });
                clearErrors('gender');
              }}
              className={`flex-1 py-3 px-6 rounded-xl font-noto text-sm font-medium transition-all duration-200
                ${genderValue === option.value
                  ? 'bg-amber text-white shadow-cta'
                  : 'bg-parchment border border-navy/10 text-navy hover:border-amber/40'
                }
                ${errors.gender ? 'border-danger' : ''}
              `}
              disabled={isSubmitting}
            >
              {option.label}
            </button>
          ))}
        </div>
        {errors.gender && (
          <p className="text-danger text-[13px] mt-1.5 font-noto">{String(errors.gender.message)}</p>
        )}
      </div>

      {/* City */}
      <div>
        <label className="block font-noto font-medium text-sm text-navy mb-2">
          المحافظة <span className="text-danger">*</span>
        </label>
        <select
          {...register('city_id')}
          value={cityValue?.toString() || ''}
          onChange={(e) => {
            setValue('city_id', e.target.value, { shouldValidate: true });
            clearErrors('city_id');
          }}
          className={`harafi-input w-full appearance-none cursor-pointer ${errors.city_id ? 'harafi-input-error' : ''}`}
          disabled={isSubmitting}
        >
          <option value="">اختر المحافظة</option>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name_ar}
            </option>
          ))}
        </select>
        {errors.city_id && (
          <p className="text-danger text-[13px] mt-1.5 font-noto">{String(errors.city_id.message)}</p>
        )}
      </div>

      {/* Profile Picture (Optional) */}
      <div>
        <label className="block font-noto font-medium text-sm text-navy mb-2">
          الصورة الشخصية <span className="text-muted-foreground font-normal">(اختياري)</span>
        </label>

        {profilePreview ? (
          <div className="relative inline-block">
            <img
              src={profilePreview}
              alt="Profile preview"
              className="w-24 h-24 rounded-xl object-cover border border-navy/10"
            />
            <button
              type="button"
              onClick={removeProfilePicture}
              className="absolute -top-2 -left-2 w-6 h-6 bg-danger text-white rounded-full flex items-center justify-center hover:bg-danger/80 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => profileInputRef.current?.click()}
            className="w-full py-8 border-2 border-dashed border-navy/15 rounded-xl flex flex-col items-center gap-2
              hover:border-amber/40 hover:bg-amber/[0.02] transition-all cursor-pointer"
            disabled={isSubmitting}
          >
            <Upload className="w-6 h-6 text-navy/40" />
            <span className="font-noto text-sm text-muted-foreground">اضغط لرفع صورة</span>
            <span className="font-noto text-xs text-muted-foreground/60">JPG, PNG, WebP - أقصى 5 ميغابايت</span>
          </button>
        )}

        <input
          ref={profileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleProfilePictureChange}
          className="hidden"
          disabled={isSubmitting}
        />

        {errors.profile_picture && (
          <p className="text-danger text-[13px] mt-1.5 font-noto">{String(errors.profile_picture.message)}</p>
        )}
      </div>

      {/* CV (Optional) */}
      <div>
        <label className="block font-noto font-medium text-sm text-navy mb-2">
          السيرة الذاتية <span className="text-muted-foreground font-normal">(اختياري)</span>
        </label>

        {cvFileName ? (
          <div className="flex items-center gap-3 bg-parchment rounded-xl p-4 border border-navy/10">
            <FileText className="w-8 h-8 text-amber" />
            <span className="font-noto text-sm text-navy flex-1 truncate">{cvFileName}</span>
            <button
              type="button"
              onClick={removeCV}
              className="w-6 h-6 bg-danger text-white rounded-full flex items-center justify-center hover:bg-danger/80 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => cvInputRef.current?.click()}
            className="w-full py-8 border-2 border-dashed border-navy/15 rounded-xl flex flex-col items-center gap-2
              hover:border-amber/40 hover:bg-amber/[0.02] transition-all cursor-pointer"
            disabled={isSubmitting}
          >
            <FileText className="w-6 h-6 text-navy/40" />
            <span className="font-noto text-sm text-muted-foreground">اضغط لرفع السيرة الذاتية</span>
            <span className="font-noto text-xs text-muted-foreground/60">PDF فقط - أقصى 10 ميغابايت</span>
          </button>
        )}

        <input
          ref={cvInputRef}
          type="file"
          accept="application/pdf"
          onChange={handleCVChange}
          className="hidden"
          disabled={isSubmitting}
        />

        {errors.cv_file && (
          <p className="text-danger text-[13px] mt-1.5 font-noto">{String(errors.cv_file.message)}</p>
        )}
      </div>

      {/* General Error */}
      {generalError && (
        <div className="bg-danger/10 border border-danger/20 rounded-xl p-4">
          <p className="text-danger text-sm font-noto text-center">{generalError}</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full harafi-btn-primary text-lg py-4 flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>جاري التسجيل...</span>
          </>
        ) : (
          'تسجيل'
        )}
      </button>
    </form>
  );
}
