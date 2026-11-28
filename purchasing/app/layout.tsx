import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import { CartProvider } from "../components/cart-provider";
import "./globals.css";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta-sans",
  subsets: ["latin"],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      className={`${jakartaSans.variable} ${cormorantGaramond.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
