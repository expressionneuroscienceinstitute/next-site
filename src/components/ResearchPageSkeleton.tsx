const DatasetSkeletonCard = () => (
  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 animate-pulse">
    <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-3"></div>
    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6 mb-4"></div>
    <div className="flex justify-end space-x-2">
      <div className="h-8 w-20 bg-gray-400 dark:bg-gray-700 rounded"></div>
      <div className="h-8 w-20 bg-gray-400 dark:bg-gray-700 rounded"></div>
    </div>
  </div>
);

const PublicationSkeletonItem = () => (
  <div className="border-b border-gray-200 dark:border-gray-700 py-4 animate-pulse">
    <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-4/5 mb-2"></div>
    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-3"></div>
    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
  </div>
);

export const ResearchPageSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Page Title Skeleton */}
      <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded w-1/4 mb-8"></div>

      {/* Datasets Section Skeleton */}
      <section className="mb-12">
        <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-1/3 mb-6"></div>
        <div className="grid gap-6 md:grid-cols-2">
          <DatasetSkeletonCard />
          <DatasetSkeletonCard /> 
        </div>
      </section>

      {/* Publications Section Skeleton */}
      <section>
        <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-1/3 mb-6"></div>
        <div className="space-y-0"> 
          <PublicationSkeletonItem />
          <PublicationSkeletonItem />
          <PublicationSkeletonItem />
        </div>
      </section>
    </div>
  );
}; 