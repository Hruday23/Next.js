import { notFound } from "next/navigation";

const locales = ["en", "te", "hi"] as const;
type Locale = (typeof locales)[number];

function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export default async function CartPage({ params }: PageProps<"/[lang]/cart">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const messages = (await import(`../../../messages/${lang}.json`)).default.cart;

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-12">
      <h1 className="text-3xl font-semibold text-zinc-950">{messages.title}</h1>
      <p className="mt-3 text-zinc-600">{messages.empty}</p>
    </main>
  );
}
