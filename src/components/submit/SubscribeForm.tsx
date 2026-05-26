import { useCallback, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Camera, ChevronDown, FileText, Loader2, Lock, Mail, Phone, User, X } from 'lucide-react';
import { toast } from 'sonner';
import { subscriberFormInputSchema, parseFormInput } from '@/lib/validations/subscriber.schema';
import type { SubscriberFormInput } from '@/lib/validations/subscriber.schema';
import type { City } from '@/types';
import { checkEmailExists, checkPhoneExists, insertSubscriber, uploadProfilePicture, uploadCV } from '@/lib/supabase/api';
import { SuccessCard } from '@/components/shared/SuccessCard';

interface SubscribeFormProps {
  cities: City[];
}

const inputClass =
  'harafi-input w-full';

export function SubscribeForm({ cities }: SubscribeFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [profileFileName, setProfileFileName] = useState<string | null>(null);
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

  const setProfileFile = useCallback(
    (file?: File | null) => {
      if (!file) return;
      setValue('profile_picture', file, { shouldValidate: true });
      setProfileFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => setProfilePreview(reader.result as string);
      reader.readAsDataURL(file);
      clearErrors('profile_picture');
    },
    [clearErrors, setValue],
  );

  const setCvFile = useCallback(
    (file?: File | null) => {
      if (!file) return;
      setValue('cv_file', file, { shouldValidate: true });
      setCvFileName(file.name);
      clearErrors('cv_file');
    },
    [clearErrors, setValue],
  );

  const removeProfilePicture = () => {
    setValue('profile_picture', null, { shouldValidate: true });
    setProfilePreview(null);
    setProfileFileName(null);
    if (profileInputRef.current) profileInputRef.current.value = '';
  };

  const removeCV = () => {
    setValue('cv_file', null, { shouldValidate: true });
    setCvFileName(null);
    if (cvInputRef.current) cvInputRef.current.value = '';
  };

  const onSubmit = async (formData: SubscriberFormInput) => {
    setIsSubmitting(true);
    setGeneralError(null);

    try {
      const emailExists = await checkEmailExists(formData.email);
      if (emailExists) {
        setError('email', { message: 'هذا البريد الإلكتروني مسجل مسبقاً' });
        toast.error('هذا البريد الإلكتروني مسجل مسبقاً');
        return;
      }

      const phoneExists = await checkPhoneExists(formData.phone);
      if (phoneExists) {
        setError('phone', { message: 'رقم الهاتف مسجل مسبقاً' });
        toast.error('رقم الهاتف مسجل مسبقاً');
        return;
      }

      let profilePictureUrl: string | null = null;
      let cvUrl: string | null = null;
      const userId = crypto.randomUUID();

      if (formData.profile_picture instanceof File) {
        try {
          profilePictureUrl = await uploadProfilePicture(formData.profile_picture, userId);
        } catch (err) {
          const message = err instanceof Error ? err.message : 'فشل رفع الصورة الشخصية';
          setGeneralError(message);
          toast.error(message);
          return;
        }
      }

      if (formData.cv_file instanceof File) {
        try {
          cvUrl = await uploadCV(formData.cv_file, userId);
        } catch (err) {
          const message = err instanceof Error ? err.message : 'فشل رفع السيرة الذاتية';
          setGeneralError(message);
          toast.error(message);
          return;
        }
      }

      const parsed = parseFormInput(formData);
      await insertSubscriber({
        ...parsed,
        profile_picture_url: profilePictureUrl,
        cv_url: cvUrl,
      });

      setIsSuccess(true);
      toast.success('تم تسجيلك بنجاح');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'حدث خطأ أثناء التسجيل، يرجى المحاولة لاحقاً';
      setGeneralError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return <SuccessCard />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Field label="الاسم الكامل" required error={errors.full_name?.message}>
        <div className="relative">
          <input
            type="text"
            placeholder="مثال: أحمد محمد العلي"
            {...register('full_name')}
            className={`${inputClass} pl-11 ${errors.full_name ? 'border-danger' : ''}`}
            disabled={isSubmitting}
          />
          <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-amber opacity-70" />
        </div>
      </Field>

      <Field label="البريد الإلكتروني" required error={errors.email?.message}>
        <div className="relative">
          <input
            type="email"
            placeholder="example@email.com"
            dir="ltr"
            {...register('email')}
            className={`${inputClass} pl-11 text-right ${errors.email ? 'border-danger' : ''}`}
            disabled={isSubmitting}
          />
          <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-amber opacity-70" />
        </div>
      </Field>

      <Field label="رقم الهاتف" required error={errors.phone?.message}>
        <div className="relative">
          <input
            type="tel"
            placeholder="09XXXXXXXX"
            dir="ltr"
            {...register('phone')}
            className={`${inputClass} pl-11 text-right ${errors.phone ? 'border-danger' : ''}`}
            disabled={isSubmitting}
          />
          <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-amber opacity-70" />
        </div>
      </Field>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="العمر" required error={errors.age?.message}>
          <input
            type="number"
            placeholder="25"
            min={15}
            max={80}
            {...register('age')}
            className={`${inputClass} ${errors.age ? 'border-danger' : ''}`}
            disabled={isSubmitting}
          />
        </Field>

        <Field label="الجنس" required error={errors.gender?.message}>
          <div className="grid grid-cols-2 gap-2">
            {[
              { value: 'male', label: 'ذكر' },
              { value: 'female', label: 'أنثى' },
            ].map((option) => {
              const active = genderValue === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    setValue('gender', option.value as never, { shouldValidate: true });
                    clearErrors('gender');
                  }}
                  className={`h-[50px] rounded-xl border-[1.5px] font-cairo transition-all duration-200 ${
                    active
                      ? 'border-amber bg-amber font-bold text-white'
                      : 'border-border bg-white text-navy hover:border-amber'
                  } ${errors.gender ? 'border-danger' : ''}`}
                  disabled={isSubmitting}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </Field>
      </div>

      <Field label="المحافظة" required error={errors.city_id?.message}>
        <div className="relative">
          <select
            {...register('city_id')}
            value={cityValue?.toString() || ''}
            onChange={(event) => {
              setValue('city_id', event.target.value, { shouldValidate: true });
              clearErrors('city_id');
            }}
            className={`${inputClass} appearance-none cursor-pointer pl-11 ${errors.city_id ? 'border-danger' : ''}`}
            disabled={isSubmitting}
          >
            <option value="">اختر المحافظة</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name_ar}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-amber" />
        </div>
      </Field>

      <Field label="الصورة الشخصية" hint="اختياري" error={errors.profile_picture?.message}>
        <UploadZone
          icon={<Camera className="h-5 w-5 text-amber" />}
          hint="اضغط لرفع صورة أو اسحبها هنا"
          detail="JPG, PNG, WebP - أقصى 5 ميغابايت"
          fileName={profileFileName}
          preview={profilePreview}
          disabled={isSubmitting}
          onPick={() => profileInputRef.current?.click()}
          onRemove={removeProfilePicture}
          onDrop={setProfileFile}
          accept="image/jpeg,image/png,image/webp"
        />
        <input
          ref={profileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={(event) => setProfileFile(event.target.files?.[0])}
          className="hidden"
          disabled={isSubmitting}
        />
      </Field>

      <Field label="السيرة الذاتية" hint="اختياري" error={errors.cv_file?.message}>
        <UploadZone
          icon={<FileText className="h-5 w-5 text-amber" />}
          hint="اضغط لرفع السيرة الذاتية أو اسحبها هنا"
          detail="PDF فقط - أقصى 10 ميغابايت"
          fileName={cvFileName}
          disabled={isSubmitting}
          onPick={() => cvInputRef.current?.click()}
          onRemove={removeCV}
          onDrop={setCvFile}
          accept="application/pdf"
        />
        <input
          ref={cvInputRef}
          type="file"
          accept="application/pdf"
          onChange={(event) => setCvFile(event.target.files?.[0])}
          className="hidden"
          disabled={isSubmitting}
        />
      </Field>

      {generalError && (
        <div className="rounded-lg border border-danger/20 bg-danger/10 p-4">
          <p className="text-center font-noto text-sm text-danger">{generalError}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="harafi-btn-primary mt-6 h-[54px] w-full gap-2 text-base"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            جاري الإرسال...
          </>
        ) : (
          <>
            <Lock className="h-4 w-4" />
            تأكيد التسجيل
            <ArrowLeft className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}

function Field({
  label,
  required,
  hint,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block font-cairo text-sm font-semibold text-navy">
        {required && <span className="ml-1 text-amber">*</span>}
        {label}
        {hint && <span className="mr-2 font-noto text-xs font-normal text-muted-foreground">({hint})</span>}
      </label>
      {children}
      {error && <p className="mt-1.5 font-noto text-xs text-danger">{String(error)}</p>}
    </div>
  );
}

function UploadZone({
  icon,
  hint,
  detail,
  fileName,
  preview,
  disabled,
  onPick,
  onRemove,
  onDrop,
  accept,
}: {
  icon: React.ReactNode;
  hint: string;
  detail: string;
  fileName: string | null;
  preview?: string | null;
  disabled: boolean;
  onPick: () => void;
  onRemove: () => void;
  onDrop: (file: File | null) => void;
  accept: string;
}) {
  const [drag, setDrag] = useState(false);

  const acceptsFile = (file: File) => accept.split(',').includes(file.type);

  return (
    <div
      onClick={!fileName && !disabled ? onPick : undefined}
      onDragOver={(event) => {
        event.preventDefault();
        if (!disabled) setDrag(true);
      }}
      onDragLeave={() => setDrag(false)}
      onDrop={(event) => {
        event.preventDefault();
        setDrag(false);
        if (disabled) return;
        const file = event.dataTransfer.files?.[0];
        if (file && acceptsFile(file)) onDrop(file);
      }}
      className={`relative flex min-h-[108px] items-center justify-center rounded-lg border border-dashed px-4 py-3 transition-colors ${
        disabled ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'
      } ${drag ? 'border-amber bg-amber/[0.06]' : 'border-border bg-white hover:border-amber'}`}
    >
      {!fileName ? (
        <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:text-right">
          <span>{icon}</span>
          <span>
            <span className="block font-noto text-sm text-muted-foreground">{hint}</span>
            <span className="block font-noto text-xs text-muted-foreground/70">{detail}</span>
          </span>
        </div>
      ) : (
        <div className="flex w-full items-center gap-3">
          {preview ? (
            <img src={preview} alt="معاينة الصورة الشخصية" className="h-[72px] w-[72px] rounded-lg object-cover" />
          ) : (
            <div className="flex h-[72px] w-[72px] items-center justify-center rounded-lg bg-sand-light text-amber">
              <FileText className="h-7 w-7" />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <div className="truncate font-cairo text-sm font-semibold text-navy">{fileName}</div>
            <div className="font-noto text-xs text-muted-foreground">جاهز للرفع عند تأكيد التسجيل</div>
          </div>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onRemove();
            }}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-white text-muted-foreground transition-colors hover:border-danger hover:bg-danger hover:text-white"
            aria-label="إزالة الملف"
            disabled={disabled}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
