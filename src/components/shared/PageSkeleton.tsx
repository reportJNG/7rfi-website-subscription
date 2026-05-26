import { Skeleton } from '@/components/shared/Skeleton';

export function PageSkeleton() {
  return (
    <div className="min-h-screen bg-parchment px-4 pb-20 pt-32">
      <div className="mx-auto max-w-[640px]">
        <Skeleton className="mx-auto mb-4 h-10 w-48" />
        <Skeleton className="mx-auto mb-10 h-5 w-72" />

        <div className="space-y-6 rounded-xl border border-border bg-white p-6 shadow-card md:p-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-12 w-full" />
            </div>
          ))}
          <Skeleton className="mt-6 h-14 w-full" />
        </div>
      </div>
    </div>
  );
}
