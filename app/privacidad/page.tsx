import { LegalPage } from "@/components/legal/LegalPage";
import { getLegalDoc } from "@/content/legal";
import { pageMetadata } from "@/lib/seo";

const doc = getLegalDoc("privacidad");

export const metadata = pageMetadata({ title: doc.title, description: doc.description, path: "/privacidad" });

export default function PrivacidadPage() {
  return <LegalPage slug="privacidad" />;
}
