import { notFound } from "next/navigation";
import HomeContent from "../../components/home-content";
import { getSarees } from "../../lib/sarees";
import type en from "../../messages/en.json";

const locales = ["en", "te", "hi"] as const;
type Locale = (typeof locales)[number];

function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LocalizedHome({
  params,
}: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const sareesPromise = getSarees(lang);
  const importedMessages = await import(`../../messages/${lang}.json`);
  const messages: typeof en = importedMessages.default;
  const sarees = await sareesPromise;
  const navLinks = messages.header.navLinks.map((link) => ({
    ...link,
    href: `/${lang}${link.href === "/" ? "" : link.href}`,
  }));
  return (
    <HomeContent
      about={messages.about}
      homePage={messages.homePage}
      navLinks={navLinks}
      locale={lang}
      sarees={sarees}
      shopMessages={messages.shop}
    />
  );
}
