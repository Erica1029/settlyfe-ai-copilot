import type { ReactNode } from "react";

type ScoreCardProps = {
  label: string;
  value: string;
  caption: string;
  icon?: ReactNode;
};

export function ScoreCard({ label, value, caption, icon }: ScoreCardProps) {
  return (
    <div className="rounded-lg border border-[#e1e6df] bg-[#fbfcf8] p-3">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#6b7280]">
          {label}
        </p>
        {icon ? <div className="text-[#2563eb]">{icon}</div> : null}
      </div>
      <p className="text-2xl font-bold text-[#10243e]">{value}</p>
      <p className="mt-1 text-xs font-medium leading-5 text-[#6b7280]">{caption}</p>
    </div>
  );
}
