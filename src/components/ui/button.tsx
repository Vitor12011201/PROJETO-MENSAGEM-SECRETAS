import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";

const variants = {
  primary: "bg-violetDeep text-white hover:bg-[#7c62ff]",
  secondary: "border border-white/15 bg-white/8 text-mist hover:bg-white/12",
  ghost: "text-slateText hover:bg-white/8 hover:text-mist",
  danger: "bg-danger text-white hover:bg-red-500"
};

export function Button({ className, variant = "primary", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: keyof typeof variants }) {
  return (
    <button
      className={cn(
        "focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50",
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
        "focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
}

