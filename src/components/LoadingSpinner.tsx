export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-background-dark">
      <div className="relative">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-accent-light dark:border-accent-dark"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-accent-light dark:text-accent-dark font-semibold text-lg">ENI</div>
        </div>
      </div>
    </div>
  )
} 