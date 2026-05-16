import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  icon?: ReactNode;
  variant?: ButtonVariant;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-[#10243e] text-white shadow-[0_12px_28px_rgba(16,36,62,0.2)] hover:bg-[#183353]",
  secondary:
    "border border-[#d8dfd6] bg-white text-[#10243e] hover:border-[#aab7a6]",
  ghost: "text-[#10243e] hover:bg-[#edf2ea]",
};

export function Button({
  children,
  icon,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {icon}
      <span>{children}</span>
    </button>
  );
}
