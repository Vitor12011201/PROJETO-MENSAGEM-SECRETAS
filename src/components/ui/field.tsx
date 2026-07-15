import { cn } from "@/lib/utils";
import type { InputHTMLAttributes, LabelHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";

export function Label({ className, ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={cn("text-sm font-medium text-mist", className)} {...props} />;
}

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input className="focus-ring min-h-11 w-full rounded-lg border border-white/12 bg-white/8 px-3 text-sm text-mist placeholder:text-slateText" {...props} />;
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className="focus-ring min-h-32 w-full resize-y rounded-lg border border-white/12 bg-white/8 p-3 text-sm text-mist placeholder:text-slateText" {...props} />;
}

export function Field({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) {
  return (
    <div className="space-y-2">
      <label className="block space-y-2 text-sm font-medium text-mist">
        <span>{label}</span>
        {children}
      </label>
      {hint ? <p className="text-xs text-slateText">{hint}</p> : null}
    </div>
  );
}
