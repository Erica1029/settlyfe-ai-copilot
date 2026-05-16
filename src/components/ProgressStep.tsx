import { Check } from "lucide-react";

type ProgressStepProps = {
  steps: string[];
  current: number;
};

export function ProgressStep({ steps, current }: ProgressStepProps) {
  return (
    <div className="grid gap-3">
      {steps.map((step, index) => {
        const done = index < current;
        const active = index === current;

        return (
          <div key={step} className="flex items-center gap-3">
            <div
              className={`flex size-8 shrink-0 items-center justify-center rounded-full border text-xs font-bold ${
                done
                  ? "border-[#18a058] bg-[#18a058] text-white"
                  : active
                    ? "border-[#2563eb] bg-[#2563eb]/10 text-[#2563eb]"
                    : "border-[#dce4d9] bg-white text-[#6b7280]"
              }`}
            >
              {done ? <Check size={15} strokeWidth={3} /> : index + 1}
            </div>
            <span
              className={`text-sm ${
                active ? "font-semibold text-[#10243e]" : "font-medium text-[#6b7280]"
              }`}
            >
              {step}
            </span>
          </div>
        );
      })}
    </div>
  );
}
