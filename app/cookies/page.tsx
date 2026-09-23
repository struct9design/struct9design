import { LegalPage } from "@/components/legal/LegalPage";
import { getLegalDoc } from "@/content/legal";
import { pageMetadata } from "@/lib/seo";

const doc = getLegalDoc("cookies");

export const metadata = pageMetadata({ title: doc.title, description: doc.description, path: "/cookies" });

export default function CookiesPage() {
  return <LegalPage slug="cookies" />;
}
