/**
 * Circuito del hero de la home.
 *
 * Adaptado de `@componentry/circuit-board` (https://componentry.dev, licencia MIT,
 * © Harsh Jadhav): se conserva su mecánica —trazos en ángulo recto que se dibujan,
 * nodos que entran y pulsos que recorren las pistas— pero con la geometría, los colores
 * y la secuencia del diseño de struct9, y animado solo con CSS y SVG (sin JavaScript,
 * para que la home cargue antes):
 *
 *   1. los 6 nodos llegan desordenados (desplazados y girados) y se colocan
 *   2. se trazan las líneas hacia el centro
 *   3. aparece el nodo central: el isotipo de struct9 con "TU NEGOCIO"
 *   4. pulsos azules pequeños viajan hacia el centro, escalonados (~cada 5 s)
 *
 * Cada elemento parte de su estado final y la animación solo describe cómo llega, así que
 * con `prefers-reduced-motion` (que anula las animaciones) todo aparece ordenado y sin
 * pulsos. Las clases `hero-*` están en globals.css.
 */

import type { CSSProperties } from "react";
import { ISOTIPO_PATHS, ISOTIPO_VIEWBOX } from "@/components/layout/isotipo-paths";

type Node = { label: string; x: number; y: number; side: "left" | "right" };

const NODES: Node[] = [
  { label: "Web", x: 26, y: 70, side: "left" },
  { label: "Google", x: 26, y: 200, side: "left" },
  { label: "WhatsApp", x: 26, y: 330, side: "left" },
  { label: "Reservas", x: 390, y: 70, side: "right" },
  { label: "Clientes", x: 390, y: 200, side: "right" },
  { label: "Facturas", x: 390, y: 330, side: "right" },
];

/** Posición de partida "desordenada" de cada nodo. */
const SCATTER = [
  { x: -46, y: -34, rotate: -9 },
  { x: -64, y: 18, rotate: 7 },
  { x: -38, y: 44, rotate: -6 },
  { x: 48, y: -40, rotate: 8 },
  { x: 66, y: 12, rotate: -7 },
  { x: 40, y: 42, rotate: 6 },
];

/** Pistas desde cada nodo hasta el nodo central (mismo orden que NODES). */
const TRACES = [
  "M130 90 H176 V204 H222",
  "M130 220 H222",
  "M130 350 H176 V236 H222",
  "M390 90 H344 V204 H298",
  "M390 220 H298",
  "M390 350 H344 V236 H298",
];

// Tiempos (s), tomados del diseño
const NODE_DELAY = (i: number) => 0.15 + i * 0.08;
const TRACE_DELAY = (i: number) => 1.1 + i * 0.12;
const CENTER_DELAY = 2.2;
const PULSE_START = (i: number) => 2.8 + i * 0.9;
const PULSE_DUR = 1.8;
const PULSE_GAP = 3.6; // 1,8 s de viaje + 3,6 s de pausa ≈ un pulso por pista cada 5,4 s

const inter = { fontFamily: "var(--font-inter), sans-serif" };
const manrope = { fontFamily: "var(--font-manrope), sans-serif" };

export function HeroCircuit() {
  return (
    <svg
      viewBox="0 0 520 440"
      role="img"
      aria-label="Web, Google, WhatsApp, reservas, clientes y facturas conectados en un único sistema"
      className="hero-circuit block h-auto w-full overflow-visible"
    >
      <defs>
        <pattern id="s9dots" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1.2" fill="#D9DEE5" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="520" height="440" rx="18" fill="url(#s9dots)" opacity=".7" />

      {/* Pistas: base niebla + trazo azul que se dibuja */}
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        {TRACES.map((d, i) => (
          <g key={d}>
            <path d={d} stroke="#D9DEE5" strokeWidth="2" />
            <path
              id={`s9t${i}`}
              className="hero-trace"
              d={d}
              pathLength={1}
              stroke="#2F6BFF"
              strokeWidth="1.6"
              style={{ animationDelay: `${TRACE_DELAY(i)}s` }}
            />
          </g>
        ))}
      </g>

      {/* Pulsos que viajan hacia el centro */}
      <g className="hero-pulses">
        {TRACES.map((_, i) => {
          const begin = `${PULSE_START(i)}s;s9p${i}.end+${PULSE_GAP}s`;
          return (
            <circle key={i} r="3.2" fill="#2F6BFF" opacity="0" visibility="hidden">
              <animate attributeName="visibility" values="visible;visible" dur={`${PULSE_DUR}s`} begin={begin} />
              <animateMotion
                id={`s9p${i}`}
                dur={`${PULSE_DUR}s`}
                begin={begin}
                calcMode="spline"
                keyPoints="0;1"
                keyTimes="0;1"
                keySplines=".4 0 .2 1"
              >
                <mpath href={`#s9t${i}`} />
              </animateMotion>
              <animate
                attributeName="opacity"
                values="0;1;1;0"
                keyTimes="0;.15;.8;1"
                dur={`${PULSE_DUR}s`}
                begin={begin}
              />
            </circle>
          );
        })}
      </g>

      {/* Nodos: tarjeta blanca, borde niebla y punto señal */}
      {NODES.map((n, i) => {
        const cy = n.y + 20;
        const port = n.side === "left" ? n.x + 104 : n.x;
        return (
          <g
            key={n.label}
            className="hero-node"
            style={
              {
                "--sx": `${SCATTER[i].x}px`,
                "--sy": `${SCATTER[i].y}px`,
                "--sr": `${SCATTER[i].rotate}deg`,
                animationDelay: `${NODE_DELAY(i)}s`,
              } as CSSProperties
            }
          >
            <rect x={n.x} y={n.y} width="104" height="40" rx="10" fill="#FFFFFF" stroke="#D9DEE5" />
            <circle cx={n.x + 18} cy={cy} r="4" fill="#2F6BFF" />
            <text x={n.x + 30} y={cy + 4.5} fontSize="13" fontWeight="600" fill="#13294B" style={inter}>
              {n.label}
            </text>
            <circle cx={port} cy={cy} r="3.5" fill="#FFFFFF" stroke="#2F6BFF" strokeWidth="1.5" />
          </g>
        );
      })}

      {/* Nodo central */}
      <g className="hero-center" style={{ animationDelay: `${CENTER_DELAY}s` }}>
        {/* Anillo exterior con la misma forma que el isotipo (radio ≈ 21 % del lado) */}
        <rect x="206" y="166" width="108" height="108" rx="23" fill="none" stroke="#D9DEE5" />
        {/* Isotipo 76×76 centrado en (260, 220): sus lados coinciden con el final de las pistas */}
        <svg x="222" y="182" width="76" height="76" viewBox={ISOTIPO_VIEWBOX} aria-hidden="true">
          {ISOTIPO_PATHS.map((p) => (
            <path key={p.d.slice(0, 24)} fill={p.fill} d={p.d} />
          ))}
        </svg>
        <text
          x="260"
          y="300"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          letterSpacing="1.6"
          fill="#5B6675"
          style={manrope}
        >
          TU NEGOCIO
        </text>
      </g>
    </svg>
  );
}
