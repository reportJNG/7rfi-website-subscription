import { Skeleton } from '@/components/ui/skeleton';

export function PageSkeleton() {
  return (
    <div className="min-h-screen bg-parchment pt-[120px] pb-20 px-4">
      <div className="max-w-[640px] mx-auto">
        <Skeleton className="h-10 w-48 mx-auto mb-4" />
        <Skeleton className="h-5 w-72 mx-auto mb-10" />

        <div className="bg-white rounded-[20px] p-10 shadow-form space-y-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-12 w-full" />
            </div>
          ))}
          <Skeleton className="h-14 w-full mt-6" />
        </div>
      </div>
    </div>
  );
}
