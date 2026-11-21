import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type en from "../../../messages/en.json";

const locales = ["en", "te", "hi"] as const;
type Locale = (typeof locales)[number];

function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/about">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const messages: typeof en = (await import(`../../../messages/${lang}.json`)).default;
  return {
    title: `${messages.about.pageTitle} | ${messages.brandName}`,
    description: messages.about.description,
  };
}

export default async function AboutPage({
  params,
}: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const messages: typeof en.about = (await import(`../../../messages/${lang}.json`)).default.about;

  return (
    <main className="flex-1 bg-[#fbf8f4] text-[#342a24]">
      <section className="relative overflow-hidden border-b border-[#e9dfd4]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-40 h-[28rem] w-[28rem] rounded-full border border-[#e5d6c7] sm:right-[-8rem]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-24 h-[24rem] w-[24rem] rounded-full border border-[#eee4da] sm:right-[-4rem]"
        />
        <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-6 py-20 sm:py-28 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-20">
          <div className="max-w-3xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-[#9b6848]">
              {messages.eyebrow}
            </p>
            <h1 className="font-serif text-4xl leading-tight tracking-tight text-[#342a24] sm:text-5xl lg:text-6xl">
              {messages.title}
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#6b5b50]">
              {messages.introduction}
            </p>
          </div>
          <div
            aria-hidden="true"
            className="relative mx-auto flex aspect-[4/3] w-full max-w-md items-center justify-center overflow-hidden rounded-[48%_52%_42%_58%/46%_42%_58%_54%] bg-[#e8d9c9]"
          >
            <div className="absolute inset-5 rounded-[48%_52%_42%_58%/46%_42%_58%_54%] border border-[#f6eee6]/80" />
            <div className="absolute inset-10 rounded-[48%_52%_42%_58%/46%_42%_58%_54%] border border-[#f6eee6]/70" />
            <div className="absolute inset-16 rounded-[48%_52%_42%_58%/46%_42%_58%_54%] border border-[#f6eee6]/60" />
            <div className="h-24 w-24 rotate-45 border border-[#9b6848]/60" />
            <div className="absolute h-14 w-14 rotate-45 border border-[#9b6848]/50" />
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-20 sm:py-24">
        <div className="max-w-3xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-[#9b6848]">
            {messages.eyebrow}
          </p>
          <h2 className="font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
            {messages.craftTitle}
          </h2>
          <p className="mt-5 text-base leading-7 text-[#6b5b50] sm:text-lg sm:leading-8">
            {messages.craftIntroduction}
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {messages.craft.map((craft, index) => (
            <article
              className="rounded-2xl border border-[#e9dfd4] bg-white/70 p-7 sm:p-8"
              key={craft.title}
            >
              <p className="text-sm font-medium tracking-[0.16em] text-[#a8795b]">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-7 font-serif text-2xl leading-snug">{craft.title}</h3>
              <p className="mt-4 leading-7 text-[#6b5b50]">{craft.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#46372e] text-[#fbf8f4]">
        <div className="mx-auto w-full max-w-7xl px-6 py-16 sm:py-20">
          <div className="max-w-3xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-[#d9b79e]">
              {messages.eyebrow}
            </p>
            <h2 className="font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
              {messages.philosophyTitle}
            </h2>
            <p className="mt-6 text-lg leading-8 text-[#eee3d9]">{messages.philosophy}</p>
            <p className="mt-5 border-l border-[#d9b79e] pl-5 text-base leading-7 text-[#d9c9bc]">
              {messages.closingStatement}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
