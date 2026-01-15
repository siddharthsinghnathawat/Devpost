'use client';

import { cn } from '@/lib/utils';

export function Preloader() {
  return (
    <div
      className={cn(
        'fixed inset-0 z-[100] flex items-center justify-center bg-black transition-opacity duration-1000'
      )}
    >
      <h1 className="text-2xl md:text-5xl font-bold tracking-tight text-white font-headline uppercase animate-pulse">
        SafeHire
      </h1>
    </div>
  );
}
