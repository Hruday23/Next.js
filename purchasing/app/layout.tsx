import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer, Header } from "../../reusable-components/src";
import { CartProvider } from "../components/cart-provider";
import type en from "../messages/en.json";
import "./globals.css";

const locales = ["en", "te", "hi"] as const;
type Locale = (typeof locales)[number];

function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

function localePath(locale: Locale, path: string): string {
  return `/${locale}${path === "/" ? "" : path}`;
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ lang?: string }>;
};

export async function generateMetadata({
  params,
}: Pick<LayoutProps, "params">): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = lang === undefined ? "en" : isLocale(lang) ? lang : notFound();
  const messages: typeof en = (await import(`../messages/${locale}.json`)).default;
  return {
    title: messages.metadata.title,
    description: messages.metadata.description,
  };
}

export default async function RootLayout({ children, params }: LayoutProps) {
  const { lang } = await params;
  const locale: Locale = lang === undefined ? "en" : isLocale(lang) ? lang : notFound();
  const messages: typeof en = (await import(`../messages/${locale}.json`)).default;
  const navLinks = messages.header.navLinks.map((link) => ({
    ...link,
    href: localePath(locale, link.href),
  }));
  const footerColumns = messages.footer.columns.map((column) => ({
    ...column,
    links: column.links.map((link) => ({
      ...link,
      href: localePath(locale, link.href),
    })),
  }));
  const legalLinks = messages.footer.legalLinks.map((link) => ({
    ...link,
    href: localePath(locale, link.href),
  }));

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <Header
            brandName={messages.brandName}
            brandHref={localePath(locale, "/")}
            brandLogoSrc="/Logo.jpeg"
            cartHref={localePath(locale, "/cart")}
            linkComponent={Link}
            navLinks={navLinks}
            navigationLabel={messages.header.navigationLabel}
            searchLabel={messages.header.searchLabel}
            cartLabel={messages.header.cartLabel}
          />
          {children}
          <Footer
            brandName={messages.brandName}
            brandHref={localePath(locale, "/")}
            brandLogoSrc="/Logo.jpeg"
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
