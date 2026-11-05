"use client";

import Image from "next/image";
import { useCart } from "./cart-provider";

export interface SareeCardProduct {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
}

interface SareeCardProps {
  product: SareeCardProduct;
  locale: string;
  addToCartLabel: string;
  buyNowLabel: string;
}

export default function SareeCard({
  product,
  locale,
  addToCartLabel,
  buyNowLabel,
}: SareeCardProps) {
  const { addItem } = useCart();
  const formattedPrice = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(product.price);
  const orderMessage = [
    `Product: ${product.name}`,
    `Price: ${formattedPrice}`,
    `Image: ${product.image}`,
  ].join("\n");
  const whatsappUrl = `https://wa.me/918919100979?text=${encodeURIComponent(orderMessage)}`;

  return (
    <article className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-[4/5] overflow-hidden bg-zinc-100">
        <Image
          alt={product.name}
          className="object-cover transition-transform duration-300 hover:scale-105"
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          src={product.image}
        />
      </div>
      <div className="space-y-3 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
          {product.category}
        </p>
        <h2 className="text-lg font-semibold leading-6 text-zinc-950">{product.name}</h2>
        <p className="min-h-12 text-sm leading-6 text-zinc-600">{product.description}</p>
        <p className="pt-1 text-lg font-bold text-zinc-950">{formattedPrice}</p>
        <div className="grid gap-3 pt-2 sm:grid-cols-2">
          <button
            className="rounded-full border border-zinc-300 px-4 py-2.5 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-100"
            onClick={() => addItem(product)}
            type="button"
          >
            {addToCartLabel}
          </button>
          <a
            className="rounded-full bg-green-700 px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-green-800"
            href={whatsappUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            {buyNowLabel}
          </a>
        </div>
      </div>
    </article>
  );
}
