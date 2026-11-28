import { notFound } from "next/navigation";
import CartContent from "../../../components/cart-content";

const locales = ["en", "te", "hi"] as const;
type Locale = (typeof locales)[number];

function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function CartPage({ params }: PageProps<"/[lang]/cart">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const messages = (await import(`../../../messages/${lang}.json`)).default.cart;

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-12 text-[#1F2022] sm:px-6 lg:px-8">
      <h1 className="font-serif text-4xl font-semibold text-[#1F2022] sm:text-5xl">{messages.title}</h1>
      <CartContent
        locale={lang}
        labels={{
          empty: messages.empty,
          remove: messages.remove,
          continueShopping: messages.continueShopping,
          total: messages.total,
          orderOnWhatsApp: messages.orderOnWhatsApp,
        }}
        shopHref={`/${lang}/shop`}
      />
    </main>
  );
}
