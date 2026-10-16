import StatsCardSkeleton from "../molecules/StatsCardSkeleton";

const SKELETON_COUNT = 5;

interface SurveyStatsSectionSkeletonProps {
  className?: string;
}

export default function SurveyStatsSectionSkeleton({ className }: SurveyStatsSectionSkeletonProps) {
  return (
    <section className={className}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
        {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
          <StatsCardSkeleton key={index} />
        ))}
      </div>
    </section>
  );
}
