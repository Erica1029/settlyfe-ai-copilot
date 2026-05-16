import type { HTMLAttributes, ReactNode } from "react";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function Card({ children, className = "", ...props }: CardProps) {
  return (
    <section
      className={`rounded-lg border border-[#e1e6df] bg-white p-4 shadow-[0_16px_40px_rgba(16,36,62,0.07)] ${className}`}
      {...props}
    >
      {children}
    </section>
  );
}
