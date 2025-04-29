'use client'

interface Update {
  date: string;
  description: string;
}

interface ProgressTimelineProps {
  updates: Update[];
}

export default function ProgressTimeline({ updates }: ProgressTimelineProps) {
  if (!updates || updates.length === 0) {
    return <p className="text-gray-500 dark:text-gray-400">No progress updates available yet.</p>;
  }

  // Sort updates by date, descending (most recent first)
  const sortedUpdates = [...updates].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-4">
      {sortedUpdates.map((update, index) => (
        <div key={index} className="relative pl-8 border-l-2 border-gray-300 dark:border-gray-600">
          {/* Dot on the timeline */}
          <div className="absolute -left-[5px] top-1 w-3 h-3 bg-accent-light dark:bg-accent-dark rounded-full border-2 border-white dark:border-gray-800"></div>
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
            {new Date(update.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
          </p>
          <p className="text-sm text-text-light dark:text-text-dark">
            {update.description}
          </p>
        </div>
      ))}
    </div>
  );
} 