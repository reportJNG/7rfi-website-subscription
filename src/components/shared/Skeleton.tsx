import type { ComponentProps } from 'react';

interface SkeletonProps extends ComponentProps<'div'> {
  className?: string;
}

export function Skeleton({ className = '', ...props }: SkeletonProps) {
  return <div className={`animate-pulse rounded-md bg-accent ${className}`} {...props} />;
}
