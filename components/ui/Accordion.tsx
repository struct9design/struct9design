"use client";

import { useId, useState } from "react";
import type { Faq } from "@/content/faqs";

/** FAQ accesible: botón con aria-expanded/aria-controls y panel con role="region". */
export function Accordion({ items, defaultOpen = 0 }: { items: Faq[]; defaultOpen?: number }) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();

  return (
    <div className="grid gap-2.5">
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${id}-b${i}`;
        const panelId = `${id}-p${i}`;
        return (
          <div
            key={item.q}
            className="overflow-hidden rounded-xl border border-niebla bg-white transition-[border-color] duration-300 hover:border-senal"
          >
            <h3 className="m-0">
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex w-full items-center gap-4 bg-transparent px-[22px] py-[19px] text-left font-display text-[1.02rem] font-bold text-tinta"
              >
                <span className="flex-1">{item.q}</span>
                <span
                  aria-hidden="true"
                  className="flex size-[26px] flex-none items-center justify-center rounded-full border border-niebla font-sans text-[15px] leading-none text-senal"
                >
                  {isOpen ? "–" : "+"}
                </span>
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={btnId} hidden={!isOpen}>
              <div className="max-w-[62ch] px-[22px] pb-[21px]">
                <p className="text-[15.5px] leading-[1.68] text-pizarra">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
