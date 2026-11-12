import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer, Header, type Locale } from "@hruday23/reusable";
import { CartProvider } from "../../components/cart-provider";
import type en from "../../messages/en.json";
import "../globals.css";

const locales = ["en", "te", "hi"] as const satisfies readonly Locale[];

function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

function localePath(locale: Locale, path: string): string {
  return `/${locale}${path === "/" ? "" : path}`;
}

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: Pick<LayoutProps, "params">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const messages: typeof en = (await import(`../../messages/${lang}.json`)).default;
  return {
    title: messages.metadata.title,
    description: messages.metadata.description,
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const messages: typeof en = (await import(`../../messages/${lang}.json`)).default;
  const navLinks = messages.header.navLinks.map((link) => ({
    ...link,
    href: localePath(lang, link.href),
  }));
  const footerColumns = messages.footer.columns.map((column) => ({
    ...column,
    links: column.links.map((link) => ({
      ...link,
      href: localePath(lang, link.href),
    })),
  }));
  const legalLinks = messages.footer.legalLinks.map((link) => ({
    ...link,
    href: localePath(lang, link.href),
  }));

  return (
    <html
      lang={lang}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <Header
            brandName={messages.brandName}
            brandHref={localePath(lang, "/")}
            brandLogoSrc={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/Logo.jpeg`}
            cartHref={localePath(lang, "/cart")}
            linkComponent={Link}
            navLinks={navLinks}
            navigationLabel={messages.header.navigationLabel}
            searchLabel={messages.header.searchLabel}
            cartLabel={messages.header.cartLabel}
          />
          {children}
          <Footer
            brandName={messages.brandName}
            brandHref={localePath(lang, "/")}
            brandLogoSrc={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/Logo.jpeg`}
            description={messages.footer.description}
            columns={footerColumns}
            copyright={messages.footer.copyright}
            legalLinks={legalLinks}
            linkComponent={Link}
          />
        </CartProvider>
      </body>
    </html>
  );
}
