export default function AwardsLoading() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-bg-primary)] animate-pulse">
      {/* Header skeleton */}
      <div className="h-20 bg-white/5" />

      {/* Hero skeleton */}
      <div className="w-full aspect-[1440/627] bg-white/5" />

      {/* Title skeleton */}
      <div className="flex flex-col items-center gap-4 py-24 px-4">
        <div className="h-8 w-64 bg-white/5 rounded" />
        <div className="h-16 w-[500px] max-w-full bg-white/5 rounded" />
      </div>

      {/* Content skeleton */}
      <div className="max-w-[1440px] mx-auto w-full px-4 lg:px-[144px] flex gap-[120px]">
        {/* Sidebar skeleton */}
        <div className="hidden lg:flex flex-col gap-4 w-[178px] shrink-0">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-12 bg-white/5 rounded" />
          ))}
        </div>

        {/* Cards skeleton */}
        <div className="flex-1 flex flex-col gap-20">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex flex-col lg:flex-row gap-12">
              <div className="w-[200px] lg:w-[336px] h-[200px] lg:h-[336px] bg-white/5 rounded-3xl mx-auto lg:mx-0 shrink-0" />
              <div className="flex-1 flex flex-col gap-6">
                <div className="h-8 w-48 bg-white/5 rounded" />
                <div className="h-24 bg-white/5 rounded" />
                <div className="h-12 w-64 bg-white/5 rounded" />
                <div className="h-12 w-48 bg-white/5 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
