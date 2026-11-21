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
  addedToCartLabel: string;
  buyNowLabel: string;
}

export default function SareeCard({
  product,
  locale,
  addToCartLabel,
  addedToCartLabel,
  buyNowLabel,
}: SareeCardProps) {
  const { items, addItem } = useCart();
  const isInCart = items.some((item) => item.id === product.id);
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
    <article className="overflow-hidden rounded-2xl border border-[#e9dfd4] bg-[#fffdfa] shadow-[0_12px_35px_-28px_rgba(52,42,36,0.5)] transition-shadow hover:shadow-[0_18px_42px_-25px_rgba(52,42,36,0.45)]">
      <div className="relative aspect-[4/5] overflow-hidden bg-[#e8d9c9]">
        <Image
          alt={product.name}
          className="object-cover transition-transform duration-300 hover:scale-105"
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          src={product.image}
        />
      </div>
      <div className="space-y-3 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9b6848]">
          {product.category}
        </p>
        <h2 className="font-serif text-lg font-semibold leading-6 text-[#342a24]">{product.name}</h2>
        <p className="min-h-12 text-sm leading-6 text-[#6b5b50]">{product.description}</p>
        <p className="pt-1 text-lg font-bold text-[#46372e]">{formattedPrice}</p>
        <div className="grid gap-3 pt-2 sm:grid-cols-2">
          <button
            className="cursor-pointer rounded-full border border-[#cbb19d] px-4 py-2.5 text-sm font-semibold text-[#46372e] transition-colors hover:bg-[#f6eee6] disabled:cursor-not-allowed disabled:border-[#e9dfd4] disabled:bg-[#f6eee6] disabled:text-[#9a8b80]"
            disabled={isInCart}
            onClick={() => addItem(product)}
            type="button"
          >
            {isInCart ? addedToCartLabel : addToCartLabel}
          </button>
          <a
            className="rounded-full bg-[#46372e] px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-[#5a4639]"
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
