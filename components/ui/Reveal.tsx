import type { ComponentProps, ElementType } from "react";

type RevealProps<T extends ElementType> = {
  as?: T;
  /** Retraso en milisegundos, como los `data-delay` del diseño. */
  delay?: number;
} & Omit<ComponentProps<T>, "as">;

/**
 * Aparece con opacidad y translateY(20px) al entrar en pantalla, una sola vez.
 * Es un componente de servidor: la observación la hace <RevealObserver /> en el layout.
 */
export function Reveal<T extends ElementType = "div">({ as, delay = 0, style, ...props }: RevealProps<T>) {
  const Tag = (as ?? "div") as ElementType;
  return (
    <Tag
      data-reveal=""
      style={delay ? { ...style, transitionDelay: `${delay}ms` } : style}
      {...props}
    />
  );
}
