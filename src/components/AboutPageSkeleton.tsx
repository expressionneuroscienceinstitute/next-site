export const TitleSkeleton = () => (
  <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded w-1/4 mb-8 animate-pulse"></div>
);

export const MissionSkeleton = () => (
  <section className="mb-12 animate-pulse">
    <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-1/5 mb-4"></div>
    <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
    <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
  </section>
);

export const BoardSkeleton = () => (
  <section className="mb-12 animate-pulse">
    <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-1/4 mb-6"></div>
    <div className="grid gap-8 xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="w-48 h-48 bg-gray-300 dark:bg-gray-700 rounded-xl mb-4 flex-shrink-0"></div>
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-3"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full mb-1"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full mb-1"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
        </div>
      ))}
    </div>
  </section>
);

export const FutureSkeleton = () => (
  <section className="text-center py-12 border-t border-gray-300 dark:border-gray-700 mt-12 animate-pulse">
    <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-1/3 mx-auto mb-4"></div>
    <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded max-w-2xl mx-auto mb-2"></div>
    <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded max-w-xl mx-auto"></div>
  </section>
); 