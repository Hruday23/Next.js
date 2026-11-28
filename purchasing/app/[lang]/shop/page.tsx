import { notFound } from "next/navigation";
import SareeCard from "../../../components/saree-card";
import { getSarees, type StorefrontLocale } from "../../../lib/sarees";

const locales = ["en", "te", "hi"] as const;
type Locale = StorefrontLocale;

function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
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
    <main
      className="linen-paper-canvas mx-auto w-full max-w-7xl flex-1 px-4 pb-16 pt-10 text-[#1F2022] sm:px-6 sm:pb-20 sm:pt-14 lg:px-8"
      id="top"
    >
      <section className="border-b border-[#D6CEC0] pb-8 sm:pb-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <p className="inline-flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#6D5E4C] sm:text-[0.7rem]">
              <span>Telangana Dyeing &amp; Printing Atelier</span>
              <span aria-hidden="true">·</span>
              <span>Batch Archive 2026</span>
            </p>
            <h1 className="font-serif text-4xl font-bold leading-[1.06] tracking-tight text-[#1F2022] sm:text-5xl lg:text-[54px]">
              {messages.title}
            </h1>
            <p className="text-sm leading-relaxed text-[#5E6064] sm:text-base">
              Small-batch raw weaves hand-dyed and block-printed in our Telangana workshop.
              Every piece is numbered <strong className="font-semibold text-[#1F2022]">1 of 1</strong>
              —crafted in Pure Cotton, Georgette, Chiffon, Crepe, and Linen Cotton.
            </p>
          </div>

          <div className="grid shrink-0 grid-cols-3 gap-3 rounded-2xl border border-[#D6CEC0] bg-[#FAF8F5]/90 px-4 py-4 shadow-sm sm:gap-5 sm:px-6">
            <div className="space-y-0.5">
              <span className="block font-serif text-lg font-bold text-[#1F2022] sm:text-xl">100%</span>
              <span className="block text-[0.65rem] font-medium text-[#5E6064] sm:text-[0.7rem]">Hand-blocked</span>
            </div>
            <div className="space-y-0.5 border-l border-[#D6CEC0] pl-3 sm:pl-5">
              <span className="block font-serif text-lg font-bold text-[#1F2022] sm:text-xl">6m</span>
              <span className="block text-[0.65rem] font-medium text-[#5E6064] sm:text-[0.7rem]">+ blouse piece</span>
            </div>
            <div className="space-y-0.5 border-l border-[#D6CEC0] pl-3 sm:pl-5">
              <span className="block font-serif text-lg font-bold text-[#6D5E4C] sm:text-xl">Direct</span>
              <span className="block text-[0.65rem] font-medium text-[#5E6064] sm:text-[0.7rem]">Workshop price</span>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Saree Collection Catalog" className="pt-6">
        <div className="mb-5 flex items-center justify-between gap-4 px-1 text-xs text-[#5E6064]">
          <p>
            Showing <strong className="font-bold text-[#1F2022]">{sarees.length}</strong>{" "}
            certified 1-of-1 saree {sarees.length === 1 ? "edition" : "editions"}
          </p>
          <span className="hidden font-semibold uppercase tracking-[0.12em] text-[#6D5E4C] sm:inline">
            Raw Weave Archive
          </span>
        </div>

        {sarees.length === 0 ? (
          <div className="mx-auto my-12 max-w-lg space-y-4 rounded-3xl border border-[#D6CEC0] bg-[#FAF8F5] p-8 text-center shadow-[0_18px_42px_-16px_rgba(31,32,34,0.08)] sm:p-12">
            <span aria-hidden="true" className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-[#D6CEC0] bg-[#EBE3D5] text-xl text-[#6D5E4C]">
              ✳
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#1F2022]">
              No matching 1-of-1 drapes
            </h2>
            <p className="text-sm leading-relaxed text-[#5E6064]">{messages.empty}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-7 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {sarees.map((saree) => (
              <SareeCard
                key={saree.id}
                product={saree}
                locale={lang}
                addToCartLabel={messages.addToCart}
                addedToCartLabel={messages.addedToCart}
                buyNowLabel={messages.buyNow}
              />
            ))}
          </div>
        )}
      </section>

      <section className="relative mt-16 overflow-hidden rounded-3xl border border-[#2D2F33] bg-[radial-gradient(circle_at_82%_18%,#2D2F33_0%,#1F2022_52%,#151618_100%)] p-7 text-[#F5F0E8] shadow-[0_18px_42px_-16px_rgba(31,32,34,0.08)] sm:mt-20 sm:p-11">
        <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-32 h-72 w-72 rounded-full border border-[#A89680]/25" />
        <div className="relative grid items-center gap-7 lg:grid-cols-12">
          <div className="space-y-3 lg:col-span-8">
            <span className="inline-flex items-center rounded-full border border-[#8C7A65]/45 bg-[#8C7A65]/20 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[#A89680]">
              Bespoke Telangana Dyeing Unit
            </span>
            <h2 className="font-serif text-3xl font-bold leading-tight text-[#FAF8F5] sm:text-4xl">
              Want any weave dyed in your personal shade &amp; hand-block motif?
            </h2>
            <p className="max-w-2xl text-sm leading-relaxed text-[#F5F0E8]/80">
              Every meter is dyed and block-printed inside our own Telangana unit, with custom shades
              available across our signature raw weaves.
            </p>
          </div>
          <a
            className="inline-flex min-h-12 items-center justify-center justify-self-start rounded-full bg-[#F5F0E8] px-6 py-3.5 text-sm font-bold text-[#1F2022] transition hover:bg-[#FAF8F5] lg:col-span-4 lg:justify-self-end"
            href={`https://wa.me/918919100979?text=${encodeURIComponent("Namaste Bharathi Prints! I would like to enquire about a custom dyed and hand-blocked saree.")}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            Commission a custom saree <span aria-hidden="true" className="ml-2">↗</span>
          </a>
        </div>
      </section>
    </main>
  );
}
