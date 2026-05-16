import { AlertTriangle } from "lucide-react";

type RiskCardProps = {
  risks: string[];
};

export function RiskCard({ risks }: RiskCardProps) {
  return (
    <div className="rounded-lg border border-[#f8d799] bg-[#fff8ea] p-4">
      <div className="mb-3 flex items-center gap-2 text-[#8a5200]">
        <AlertTriangle size={18} />
        <h3 className="text-sm font-bold">Risk alerts</h3>
      </div>
      <ul className="grid gap-2">
        {risks.map((risk) => (
          <li key={risk} className="text-sm leading-6 text-[#6d4a09]">
            {risk}
          </li>
        ))}
      </ul>
    </div>
  );
}
