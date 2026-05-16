import type { ReactNode } from "react";

type RecommendationCardProps = {
  title: string;
  value: string;
  description: string;
  icon?: ReactNode;
};

export function RecommendationCard({
  title,
  value,
  description,
  icon,
}: RecommendationCardProps) {
  return (
    <div className="rounded-lg border border-[#e1e6df] bg-white p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#6b7280]">
          {title}
        </p>
        {icon ? <div className="text-[#18a058]">{icon}</div> : null}
      </div>
      <h3 className="text-lg font-bold text-[#10243e]">{value}</h3>
      <p className="mt-2 text-sm leading-6 text-[#52605a]">{description}</p>
    </div>
  );
}
