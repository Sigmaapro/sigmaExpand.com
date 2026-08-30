import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type SurfaceProps = {
  children: ReactNode;
  className?: string;
};

export function GlassSurface({ children, className }: SurfaceProps) {
  return <div className={cn("glass-surface", className)}>{children}</div>;
}

export function GlassPanel({ children, className }: SurfaceProps) {
  return <div className={cn("glass-panel rounded-2xl", className)}>{children}</div>;
}

export function GlassDivider({ className }: { className?: string }) {
  return <hr className={cn("glass-divider", className)} />;
}

export function GlassChip({ children, className }: SurfaceProps) {
  return <span className={cn("glass-chip", className)}>{children}</span>;
}

export const GlassField = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  function GlassField({ className, ...props }, ref) {
    return <input ref={ref} className={cn("glass-field", className)} {...props} />;
  },
);

export const GlassTextarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(function GlassTextarea({ className, ...props }, ref) {
  return <textarea ref={ref} className={cn("glass-field resize-y", className)} {...props} />;
});

export const GlassSelect = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  function GlassSelect({ className, ...props }, ref) {
    return <select ref={ref} className={cn("glass-field bg-transparent", className)} {...props} />;
  },
);

export const GlassButton = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" }
>(function GlassButton({ variant = "primary", className, ...props }, ref) {
  return (
    <button
      ref={ref}
      className={cn(
        "glass-button",
        variant === "primary" ? "glass-button-primary" : "glass-button-secondary",
        className,
      )}
      {...props}
    />
  );
});
