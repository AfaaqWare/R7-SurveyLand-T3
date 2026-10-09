import { cn } from "@/lib/cn";

export type StatusBadgeVariant = "draft" | "published" | "closed";

interface StatusBadgeProps {
  status: StatusBadgeVariant;
  className?: string;
}

const statusStyles: Record<StatusBadgeVariant, string> = {
  draft: "bg-[#fff3d9] text-[#eda321]",
  published: "bg-[#e2f3eb] text-[#359e63]",
  closed: "ds-text-disabled bg-[#ebebeb]",
};

const statusLabels: Record<StatusBadgeVariant, string> = {
  published: "Published",
  draft: "Draft",
  closed: "Closed",
};
export default function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center justify-center",
        "ds-rounded-sm px-3 py-1",
        "ds-text-xs ds-font-bold",
        statusStyles[status],
        className
      )}
    >
      {statusLabels[status]}
    </span>
  );
}
