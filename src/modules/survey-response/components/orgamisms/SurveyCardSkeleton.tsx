import Skeleton from "@/shared/components/atoms/Skeleton";

export default function SurveyCardSkeleton() {
  return (
    <div
      className="ds-bg-card ds-border-card ds-rounded-2xl flex flex-col overflow-hidden"
      role="status"
      aria-hidden="true"
    >
      {/* Cover */}
      <Skeleton className="aspect-16/9 w-full rounded-none" />

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-full" />

        <div className="flex items-center justify-between">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-24" />
        </div>

        <Skeleton className="h-3 w-28" />

        <div className="mt-auto flex items-center gap-2 pt-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-8 flex-1 rounded-md" />
          ))}
        </div>
      </div>
    </div>
  );
}
