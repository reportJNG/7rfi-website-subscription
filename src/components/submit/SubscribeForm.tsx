import { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Camera, ChevronDown, FileText, Loader2, Lock, Mail, Phone, User, X } from 'lucide-react';
import { toast } from 'sonner';
import { subscriberFormInputSchema, subscriberSchema, parseFormInput } from '@/lib/validations/subscriber.schema';
import type { SubscriberFormInput } from '@/lib/validations/subscriber.schema';
import type { City } from '@/types';
import { checkEmailExists, checkPhoneExists, insertSubscriber, uploadProfilePicture, uploadCV } from '@/lib/supabase/api';
import { SuccessCard } from '@/components/shared/SuccessCard';

interface SubscribeFormProps {
  cities: City[];
}

const inputClass =
  'harafi-input w-full';

const PROFILE_ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const PROFILE_MAX_SIZE = 5 * 1024 * 1024;
const CV_ACCEPTED_TYPES = ['application/pdf'];
const CV_MAX_SIZE = 10 * 1024 * 1024;

export function SubscribeForm({ cities }: SubscribeFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [profileFileName, setProfileFileName] = useState<string | null>(null);
  const [cvFileName, setCvFileName] = useState<string | null>(null);
  const [cityOpen, setCityOpen] = useState(false);

  const profileInputRef = useRef<HTMLInputElement>(null);
  const cvInputRef = useRef<HTMLInputElement>(null);
  const cityDropdownRef = useRef<HTMLDivElement>(null);

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
  const selectedCity = cities.find((city) => city.id.toString() === cityValue?.toString());

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!cityDropdownRef.current?.contains(event.target as Node)) {
        setCityOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setCityOpen(false);
      }
    }

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const setProfileFile = useCallback(
    (file?: File | null) => {
      if (!file) return;
      if (!PROFILE_ACCEPTED_TYPES.includes(file.type)) {
        const message = 'صيغة الصورة يجب أن تكون JPG أو PNG أو WebP';
        setError('profile_picture', { message });
        toast.error(message);
        return;
      }
      if (file.size > PROFILE_MAX_SIZE) {
        const message = 'الصورة يجب أن تكون أقل من 5 ميغابايت';
        setError('profile_picture', { message });
        toast.error(message);
        return;
      }
      setValue('profile_picture', file, { shouldValidate: true });
      setProfileFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => setProfilePreview(reader.result as string);
      reader.readAsDataURL(file);
      clearErrors('profile_picture');
    },
    [clearErrors, setError, setValue],
  );

  const setCvFile = useCallback(
    (file?: File | null) => {
      if (!file) return;
      if (!CV_ACCEPTED_TYPES.includes(file.type)) {
        const message = 'السيرة الذاتية يجب أن تكون ملف PDF';
        setError('cv_file', { message });
        toast.error(message);
        return;
      }
      if (file.size > CV_MAX_SIZE) {
        const message = 'ملف السيرة الذاتية يجب أن يكون أقل من 10 ميغابايت';
        setError('cv_file', { message });
        toast.error(message);
        return;
      }
      setValue('cv_file', file, { shouldValidate: true });
      setCvFileName(file.name);
      clearErrors('cv_file');
    },
    [clearErrors, setError, setValue],
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

      const subscriber = subscriberSchema.parse({
        ...parseFormInput(formData),
        profile_picture_url: profilePictureUrl,
        cv_url: cvUrl,
      });

      await insertSubscriber({
        ...subscriber,
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
            className={`${inputClass} pl-11 ${errors.full_name ? 'harafi-input-error' : ''}`}
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
            className={`${inputClass} pl-11 text-right ${errors.email ? 'harafi-input-error' : ''}`}
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
            className={`${inputClass} pl-11 text-right ${errors.phone ? 'harafi-input-error' : ''}`}
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
            className={`${inputClass} ${errors.age ? 'harafi-input-error' : ''}`}
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
                  } ${errors.gender ? 'border-danger focus-visible:outline-danger' : ''}`}
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
        <div ref={cityDropdownRef} className="relative">
          <input type="hidden" {...register('city_id')} />
          <button
            type="button"
            onClick={() => {
              if (!isSubmitting) setCityOpen((open) => !open);
            }}
            className={`${inputClass} flex items-center justify-between gap-3 text-right ${
              errors.city_id ? 'harafi-input-error' : ''
            } ${isSubmitting ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}`}
            disabled={isSubmitting}
            aria-haspopup="listbox"
            aria-expanded={cityOpen}
          >
            <span className={selectedCity ? 'text-navy' : 'text-slate-400'}>
              {selectedCity?.name_ar ?? 'اختر المحافظة'}
            </span>
            <ChevronDown className={`h-4 w-4 shrink-0 text-amber transition-transform ${cityOpen ? 'rotate-180' : ''}`} />
          </button>

          {cityOpen && (
            <div className="absolute inset-x-0 top-[calc(100%+8px)] z-30 overflow-hidden rounded-lg border border-border bg-white shadow-soft">
              <div className="max-h-56 overflow-y-auto p-1" role="listbox" aria-label="المحافظة">
                {cities.map((city) => {
                  const active = selectedCity?.id === city.id;
                  return (
                    <button
                      key={city.id}
                      type="button"
                      role="option"
                      aria-selected={active}
                      onClick={() => {
                        setValue('city_id', city.id.toString(), { shouldValidate: true });
                        clearErrors('city_id');
                        setCityOpen(false);
                      }}
                      className={`flex h-10 w-full items-center rounded-md px-3 text-right font-noto text-sm transition-colors ${
                        active ? 'bg-sand-light font-semibold text-amber' : 'text-navy hover:bg-sand-light'
                      }`}
                    >
                      {city.name_ar}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
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
          hasError={!!errors.profile_picture}
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
          hasError={!!errors.cv_file}
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
  hasError,
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
  hasError?: boolean;
}) {
  const [drag, setDrag] = useState(false);

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
        if (file) onDrop(file);
      }}
      className={`relative flex min-h-[108px] items-center justify-center rounded-lg border border-dashed px-4 py-3 transition-colors ${
        disabled ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'
      } ${
        hasError
          ? 'border-danger bg-danger/5 hover:border-danger'
          : drag
            ? 'border-amber bg-amber/[0.06]'
            : 'border-border bg-white hover:border-amber'
      }`}
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
