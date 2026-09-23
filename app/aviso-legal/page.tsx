import { LegalPage } from "@/components/legal/LegalPage";
import { getLegalDoc } from "@/content/legal";
import { pageMetadata } from "@/lib/seo";

const doc = getLegalDoc("aviso-legal");

export const metadata = pageMetadata({ title: doc.title, description: doc.description, path: "/aviso-legal" });

export default function AvisoLegalPage() {
  return <LegalPage slug="aviso-legal" />;
}
