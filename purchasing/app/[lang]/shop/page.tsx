import { notFound } from "next/navigation";
import SareeCard, { type SareeCardProduct } from "../../../components/saree-card";

const locales = ["en", "te", "hi"] as const;
type Locale = (typeof locales)[number];

interface SareesApiResponse {
  success: boolean;
  count: number;
  data: SareeCardProduct[];
}

function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

async function getSarees(locale: Locale): Promise<SareeCardProduct[]> {
  const apiBaseUrl = (process.env.SAREE_API_URL ?? "http://localhost:5000").replace(/\/$/, "");
  const response = await fetch(`${apiBaseUrl}/api/sarees?lang=${locale}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Could not load sarees: backend returned HTTP ${response.status}`);
  }

  const result: SareesApiResponse = await response.json();
  if (!result.success || !Array.isArray(result.data)) {
    throw new Error("Could not load sarees: backend returned an invalid catalog response");
  }

  return result.data;
}

export default async function ShopPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const [sarees, messages] = await Promise.all([
    getSarees(lang),
    import(`../../../messages/${lang}.json`).then((dictionary) => dictionary.default.shop),
  ]);

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-12">
      <h1 className="mb-8 text-3xl font-semibold text-zinc-950">{messages.title}</h1>
      {sarees.length === 0 ? (
        <p className="text-zinc-600">{messages.empty}</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sarees.map((saree) => (
            <SareeCard
              key={saree.id}
              product={saree}
              locale={lang}
              addToCartLabel={messages.addToCart}
              buyNowLabel={messages.buyNow}
            />
          ))}
        </div>
      )}
    </main>
  );
}
