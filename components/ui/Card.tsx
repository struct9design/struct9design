import type { ComponentProps, ElementType } from "react";
import { cn } from "@/lib/utils";

type Hover = "lift" | "lift-sm" | "border" | "none";

const hovers: Record<Hover, string> = {
  // Tarjetas de servicio: translateY(-5px), sombra suave y borde azul
  lift: "transition-[transform,box-shadow,border-color] duration-[350ms] ease-s9 hover:-translate-y-[5px] hover:border-senal hover:shadow-[0_16px_40px_rgba(19,41,75,.1)]",
  "lift-sm":
    "transition-[transform,box-shadow,border-color] duration-[350ms] ease-s9 hover:-translate-y-1 hover:border-senal hover:shadow-[0_16px_40px_rgba(19,41,75,.09)]",
  border:
    "transition-[border-color,box-shadow] duration-300 hover:border-senal hover:shadow-[0_10px_26px_rgba(19,41,75,.07)]",
  none: "",
};

type CardProps<T extends ElementType> = {
  as?: T;
  hover?: Hover;
} & Omit<ComponentProps<T>, "as">;

export function Card<T extends ElementType = "div">({ as, hover = "none", className, ...props }: CardProps<T>) {
  const Tag = (as ?? "div") as ElementType;
  return <Tag className={cn("border border-niebla bg-white", hovers[hover], className)} {...props} />;
}
