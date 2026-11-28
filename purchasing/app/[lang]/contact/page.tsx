import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContactForm from "../../../components/contact-form";
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
}: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const messages: typeof en = (await import(`../../../messages/${lang}.json`)).default;
  return {
    title: `${messages.contact.pageTitle} | ${messages.brandName}`,
    description: messages.contact.description,
  };
}

export default async function ContactPage({
  params,
}: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const messages: typeof en.contact = (await import(`../../../messages/${lang}.json`)).default.contact;
  const whatsappHref = "https://wa.me/918919100979";

  return (
    <main className="flex-1 text-[#1F2022]">
      <section className="border-b border-[#D6CEC0]">
        <div className="mx-auto w-full max-w-7xl px-6 py-16 sm:py-20">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-[#6D5E4C]">
            {messages.eyebrow}
          </p>
          <h1 className="max-w-3xl font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
            {messages.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[#5E6064]">
            {messages.introduction}
          </p>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-12 sm:py-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="space-y-10">
          <section aria-labelledby="contact-direct-title">
            <h2 id="contact-direct-title" className="font-serif text-2xl">
              {messages.directTitle}
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <article className="rounded-3xl border border-[#D6CEC0] bg-[#FAF8F5]/80 p-6">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-[#1F2022]">
                  {messages.whatsappTitle}
                </h3>
                <a
                  className="mt-3 inline-block text-lg font-medium underline decoration-[#8C7A65] underline-offset-4 hover:text-[#6D5E4C]"
                  href={whatsappHref}
                  rel="noreferrer"
                  target="_blank"
                >
                  {messages.phoneNumber}
                </a>
                <p className="mt-3 leading-7 text-[#5E6064]">{messages.whatsappDescription}</p>
              </article>
              <article className="rounded-3xl border border-[#D6CEC0] bg-[#FAF8F5]/80 p-6">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-[#1F2022]">
                  {messages.businessHoursTitle}
                </h3>
                <p className="mt-3 leading-7 text-[#5E6064]">{messages.businessHours}</p>
              </article>
            </div>
          </section>

          <section aria-labelledby="contact-help-title">
            <h2 id="contact-help-title" className="font-serif text-2xl">
              {messages.helpTitle}
            </h2>
            <div className="mt-5 space-y-5">
              {messages.helpItems.map((item, index) => (
                <article className="flex gap-4" key={item.title}>
                  <span className="pt-1 text-sm font-medium tracking-widest text-[#6D5E4C]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="mt-1 leading-7 text-[#5E6064]">{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section aria-labelledby="contact-connect-title">
            <h2 id="contact-connect-title" className="font-serif text-2xl">
              {messages.connectTitle}
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <article className="rounded-3xl border border-[#D6CEC0] bg-[#FAF8F5]/80 p-6">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-[#1F2022]">
                  {messages.youtubeTitle}
                </h3>
                <a
                  className="mt-3 inline-block font-medium underline decoration-[#8C7A65] underline-offset-4 hover:text-[#6D5E4C]"
                  href="https://www.youtube.com/@bharathiprints"
                  rel="noreferrer"
                  target="_blank"
                >
                  {messages.youtubeHandle}
                </a>
                <p className="mt-2 leading-7 text-[#5E6064]">{messages.youtubeDescription}</p>
              </article>
              <article className="rounded-3xl border border-[#D6CEC0] bg-[#FAF8F5]/80 p-6">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-[#1F2022]">
                  {messages.locationTitle}
                </h3>
                <p className="mt-3 leading-7 text-[#5E6064]">{messages.location}</p>
                <h3 className="mt-5 text-sm font-semibold uppercase tracking-wide text-[#1F2022]">
                  {messages.emailTitle}
                </h3>
                <a
                  className="mt-2 inline-block break-all underline decoration-[#8C7A65] underline-offset-4 hover:text-[#6D5E4C]"
                  href={`mailto:${messages.emailAddress}`}
                >
                  {messages.emailAddress}
                </a>
              </article>
            </div>
          </section>
        </div>

        <ContactForm
          apiUrl={process.env.NEXT_PUBLIC_API_URL ?? ""}
          messages={messages}
        />
      </section>
    </main>
  );
}
