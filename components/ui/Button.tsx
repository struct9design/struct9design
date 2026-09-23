import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "secondary-light";
type Size = "md" | "sm" | "nav";

const base =
  "inline-flex items-center justify-center font-semibold whitespace-nowrap transition-[transform,box-shadow,background-color,border-color] duration-[250ms] ease-out";

const variants: Record<Variant, string> = {
  primary:
    "bg-senal !text-white shadow-[0_10px_24px_rgba(47,107,255,.24)] hover:-translate-y-0.5 hover:bg-tinta hover:shadow-[0_14px_30px_rgba(19,41,75,.24)]",
  secondary:
    "border border-niebla !text-tinta hover:border-tinta hover:bg-nieve",
  "secondary-light": "border border-niebla bg-white !text-tinta hover:border-tinta",
};

const sizes: Record<Size, string> = {
  md: "rounded-[10px] px-7 py-[15px]",
  sm: "rounded-[10px] px-[22px] py-[13px]",
  nav: "rounded-lg px-5 py-[11px] text-[14.5px] shadow-[0_6px_16px_rgba(47,107,255,.22)] hover:shadow-[0_10px_22px_rgba(19,41,75,.26)]",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md") {
  return cn(base, variants[variant], sizes[size]);
}

type ButtonLinkProps = ComponentProps<typeof Link> & { variant?: Variant; size?: Size };

export function ButtonLink({ variant = "primary", size = "md", className, ...props }: ButtonLinkProps) {
  return <Link className={cn(buttonClasses(variant, size), className)} {...props} />;
}
