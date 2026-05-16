import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
};

export function Input({ label, hint, className = "", ...props }: InputProps) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-[#1f2933]">
      <span>{label}</span>
      <input
        className={`min-h-11 rounded-lg border border-[#dce4d9] bg-white px-3 text-sm text-[#1f2933] outline-none transition placeholder:text-[#9aa39a] focus:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb]/10 ${className}`}
        {...props}
      />
      {hint ? <span className="text-xs font-medium text-[#6b7280]">{hint}</span> : null}
    </label>
  );
}
