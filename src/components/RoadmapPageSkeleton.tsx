const CardSkeleton = () => (
  <div className="card animate-pulse">
    <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/5 mb-3"></div>
    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6 mb-4"></div>
    <div className="flex gap-4">
      <div className="h-5 w-24 bg-gray-400 dark:bg-gray-700 rounded"></div>
      <div className="h-5 w-24 bg-gray-400 dark:bg-gray-700 rounded"></div>
    </div>
  </div>
);

const TimelineItemSkeleton = () => (
  <div className="flex items-start space-x-4 animate-pulse">
    {/* Dot */}
    <div className="flex-shrink-0 w-4 h-4 bg-gray-400 dark:bg-gray-700 rounded-full mt-1"></div>
    {/* Content */}
    <div className="flex-grow">
      <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-1/4 mb-2"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-1"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
    </div>
  </div>
);

export const RoadmapPageSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Page Title Skeleton */}
      <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded w-1/3 mb-8"></div>

      {/* Current Programs Skeleton */}
      <section className="mb-12">
        <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-1/4 mb-6"></div>
        <CardSkeleton />
      </section>

      {/* Timeline Skeleton */}
      <section className="mb-12">
        <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-1/5 mb-6"></div>
        <div className="space-y-8 border-l-2 border-gray-300 dark:border-gray-700 pl-6 relative">
          {/* Adding a few timeline items for visual representation */}
          <TimelineItemSkeleton />
          <TimelineItemSkeleton />
          <TimelineItemSkeleton />
        </div>
      </section>

      {/* Future Research Skeleton */}
      <section>
        <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-1/4 mb-6"></div>
        <div className="grid gap-6 md:grid-cols-2">
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </section>
    </div>
  );
}; 