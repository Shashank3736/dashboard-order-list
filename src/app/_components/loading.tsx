import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const Loading = () => {
  return (
    <div className="contents">
      {/* Row 1 small stats */}
      <div className="col-span-1 row-span-1">
        <div className="bg-card h-full w-full rounded-xl border p-4 shadow-sm">
          <Skeleton className="mb-2 h-4 w-20" />
          <Skeleton className="mb-1 h-8 w-16" />
          <Skeleton className="h-3 w-12" />
        </div>
      </div>
      <div className="col-span-1 row-span-1">
        <div className="bg-card h-full w-full rounded-xl border p-4 shadow-sm">
          <Skeleton className="mb-2 h-4 w-16" />
          <Skeleton className="mb-1 h-8 w-20" />
          <Skeleton className="h-3 w-12" />
        </div>
      </div>

      {/* Projections vs Actuals top-right big card */}
      <div className="col-span-1 row-span-2 md:col-span-2">
        <div className="bg-card h-full w-full rounded-xl border p-4 shadow-sm">
          <Skeleton className="mb-4 h-5 w-40" />
          <Skeleton className="h-48 w-full" />
        </div>
      </div>

      <div className="col-span-1 row-span-1">
        <div className="bg-card h-full w-full rounded-xl border p-4 shadow-sm">
          <Skeleton className="mb-2 h-4 w-16" />
          <Skeleton className="mb-1 h-8 w-24" />
          <Skeleton className="h-3 w-12" />
        </div>
      </div>
      <div className="col-span-1 row-span-1">
        <div className="bg-card h-full w-full rounded-xl border p-4 shadow-sm">
          <Skeleton className="mb-2 h-4 w-14" />
          <Skeleton className="mb-1 h-8 w-12" />
          <Skeleton className="h-3 w-12" />
        </div>
      </div>

      {/* Revenue line chart - big wide card */}
      <div className="col-span-1 row-span-2 md:col-span-2 lg:col-span-3">
        <div className="bg-card h-full w-full rounded-xl border p-4 shadow-sm">
          <Skeleton className="mb-4 h-5 w-32" />
          <Skeleton className="h-48 w-full" />
        </div>
      </div>

      {/* Revenue by location */}
      <div className="col-span-1 row-span-2">
        <div className="bg-card h-full w-full rounded-xl border p-4 shadow-sm">
          <Skeleton className="mb-4 h-5 w-36" />
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      </div>

      {/* Total Sales donut */}
      <div className="col-span-1 row-span-2 lg:hidden">
        <div className="bg-card h-full w-full rounded-xl border p-4 shadow-sm">
          <Skeleton className="mb-4 h-5 w-24" />
          <Skeleton className="mx-auto h-32 w-32 rounded-full" />
        </div>
      </div>

      {/* Top Selling Products */}
      <div className="col-span-1 row-span-2 md:col-span-2 lg:col-span-3">
        <div className="bg-card h-full w-full rounded-xl border p-4 shadow-sm">
          <Skeleton className="mb-4 h-5 w-40" />
          <div className="space-y-3">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
            </div>
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex justify-between">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-8" />
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Total Sales donut - desktop only */}
      <div className="col-span-1 row-span-2 hidden lg:block">
        <div className="bg-card h-full w-full rounded-xl border p-4 shadow-sm">
          <Skeleton className="mb-4 h-5 w-24" />
          <Skeleton className="mx-auto h-32 w-32 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
