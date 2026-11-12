import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "subtle" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  isExternal?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      href,
      isExternal = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "inline-flex items-center justify-center font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-laterite focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-[3px]";

    const sizeClasses = {
      sm: "text-xs px-3 py-1.5 gap-1.5 min-h-[34px]",
      md: "text-sm px-4 py-2.5 gap-2 min-h-[42px]",
      lg: "text-base px-6 py-3.5 gap-2.5 min-h-[50px]",
    }[size];

    const variantClasses = {
      primary:
        "bg-laterite text-white hover:bg-laterite-dark active:scale-[0.99] shadow-none",
      secondary:
        "bg-deep-slate text-warm-bone hover:bg-deep-slate/90 active:scale-[0.99]",
      outline:
        "border border-border-subtle bg-transparent text-deep-slate hover:bg-sand-dune/60 active:scale-[0.99]",
      subtle:
        "bg-sand-dune text-deep-slate hover:bg-border-subtle active:scale-[0.99]",
      ghost:
        "bg-transparent text-deep-slate hover:text-laterite hover:bg-sand-dune/40",
    }[variant];

    if (href) {
      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(baseClasses, sizeClasses, variantClasses, className)}
          >
            {children}
          </a>
        );
      }
      return (
        <Link
          href={href}
          className={cn(baseClasses, sizeClasses, variantClasses, className)}
        >
          {children}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(baseClasses, sizeClasses, variantClasses, className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
