import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "ghost";
};

export function Button({ children, className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex h-11 items-center justify-center rounded-md px-5 text-sm font-semibold transition",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6f7c4e]",
        "disabled:cursor-not-allowed disabled:opacity-60",
        variant === "primary" && "bg-[#d8c4a5] text-[#211b16] hover:bg-[#c9b28e]",
        variant === "ghost" && "bg-transparent text-[#2a2825] hover:bg-[#f4efe7]",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
