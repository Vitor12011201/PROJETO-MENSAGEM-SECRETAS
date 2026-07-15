import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";

const variants = {
  primary: "bg-gradient-to-br from-pinkHot to-coral text-white shadow-rose hover:-translate-y-0.5 hover:shadow-[0_22px_54px_rgba(255,61,127,0.38)]",
  secondary: "border border-white/15 bg-white/8 text-mist hover:-translate-y-0.5 hover:border-pinkSoft/40 hover:bg-white/12",
  ghost: "text-slateText hover:bg-white/8 hover:text-mist",
  danger: "bg-danger text-white hover:bg-[#ff6b75]"
};

export function Button({ className, variant = "primary", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: keyof typeof variants }) {
  return (
    <button
      className={cn(
        "focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition duration-200 disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

export function LinkButton({ className, variant = "primary", children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: keyof typeof variants; children: ReactNode }) {
  return (
    <a
      className={cn(
        "focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition duration-200",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
}
