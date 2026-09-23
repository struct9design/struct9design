import type { Metadata } from 'next'

// El panel es privado: fuera de buscadores
export const metadata: Metadata = {
  title: 'Panel',
  robots: { index: false, follow: false },
}

export default function PanelRootLayout({ children }: { children: React.ReactNode }) {
  return children
}
