import { Skeleton } from '@/components/ui/skeleton';

interface SkeletonCardProps {
  className?: string;
}

export function SkeletonCard({ className = '' }: SkeletonCardProps) {
  return (
    <div className={`bg-white rounded-2xl p-8 shadow-card ${className}`}>
      <Skeleton className="h-12 w-12 rounded-full mb-6" />
      <Skeleton className="h-6 w-40 mb-3" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-4/5" />
    </div>
  );
}
