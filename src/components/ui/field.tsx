import { cn } from "@/lib/utils";
import type { InputHTMLAttributes, LabelHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";

export function Label({ className, ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={cn("text-sm font-medium text-mist", className)} {...props} />;
}

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input className="focus-ring min-h-12 w-full rounded-xl border border-white/12 bg-white/8 px-4 text-base text-mist placeholder:text-slateText sm:min-h-11 sm:text-sm" {...props} />;
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className="focus-ring min-h-36 w-full resize-y rounded-xl border border-white/12 bg-white/8 p-4 text-base leading-7 text-mist placeholder:text-slateText sm:min-h-32 sm:text-sm" {...props} />;
}

export function Field({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) {
  return (
    <div className="space-y-2.5">
      <label className="block space-y-2.5 text-sm font-medium text-mist">
        <span>{label}</span>
        {children}
      </label>
      {hint ? <p className="text-xs text-slateText">{hint}</p> : null}
    </div>
  );
}
