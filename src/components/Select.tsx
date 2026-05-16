import type { SelectHTMLAttributes } from "react";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: string[];
  placeholder?: string;
};

export function Select({
  label,
  options,
  placeholder = "Select one",
  className = "",
  ...props
}: SelectProps) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-[#1f2933]">
      <span>{label}</span>
      <select
        className={`min-h-11 rounded-lg border border-[#dce4d9] bg-white px-3 text-sm text-[#1f2933] outline-none transition focus:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb]/10 ${className}`}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
