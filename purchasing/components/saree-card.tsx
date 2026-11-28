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
    <article className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[#D6CEC0] bg-[#FAF8F5] shadow-[0_18px_42px_-16px_rgba(31,32,34,0.08)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1.5 hover:border-[#8C7A65] hover:shadow-[0_28px_54px_-14px_rgba(31,32,34,0.16)]">
      <div>
        <div className="relative aspect-[3/4] overflow-hidden bg-[#EBE3D5]">
          <Image
            alt={product.name}
            className="object-cover object-center transition-[transform,opacity] duration-[850ms] ease-out group-hover:scale-[1.045]"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            src={product.image}
          />
          <div aria-hidden="true" className="handloom-weave-texture pointer-events-none absolute inset-0" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#151618]/70 via-[#151618]/15 to-transparent" />
          <span className="absolute left-3.5 top-3.5 max-w-[calc(100%-2rem)] truncate rounded-full border border-[#8C7A65]/55 bg-[#151618]/90 px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.14em] text-[#FAF8F5] shadow sm:left-4 sm:top-4">
            1 of 1 · Edition {product.id}
          </span>
          <span className="absolute bottom-4 left-4 max-w-[75%] truncate text-xs font-medium text-[#FAF8F5] drop-shadow">
            {product.category} · Hand-finished in Telangana
          </span>
        </div>
        <div className="space-y-3.5 p-5 sm:p-6">
          <div className="flex items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-2">
              <span className="shrink-0 text-[0.66rem] font-bold uppercase tracking-[0.16em] text-[#6D5E4C]">
                {product.category}
              </span>
              <span aria-hidden="true" className="text-[#BFB5A4]">•</span>
              <span className="truncate text-[0.66rem] font-medium text-[#5E6064]">
                Telangana atelier
              </span>
            </div>
            <span aria-hidden="true" className="flex shrink-0 items-center -space-x-1">
              <span className="h-3.5 w-3.5 rounded-full border border-[#FAF8F5] bg-[#8C7A65] shadow-sm" />
              <span className="h-3.5 w-3.5 rounded-full border border-[#FAF8F5] bg-[#2D2F33] shadow-sm" />
            </span>
          </div>
          <div className="space-y-1.5">
            <h2 className="font-serif text-[1.4rem] font-bold leading-[1.18] text-[#1F2022] transition-colors group-hover:text-[#6D5E4C] sm:text-2xl">
              {product.name}
            </h2>
            <p className="line-clamp-2 text-xs leading-relaxed text-[#5E6064] sm:text-[13px]">
              {product.description}
            </p>
          </div>
          <div className="border-t border-[#D6CEC0]/80 pt-2">
            <span className="block truncate rounded-lg border border-[#D6CEC0]/70 bg-[#F5F0E8] px-2 py-1.5 text-center text-[0.65rem] font-semibold text-[#1F2022]">
              Hand-dyed · Hand-blocked · One of one
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-3.5 px-5 pb-5 pt-1 sm:px-6 sm:pb-6">
        <div className="flex items-baseline justify-between gap-3">
          <p className="font-sans text-lg font-bold tracking-tight text-[#1F2022] sm:text-xl">
            {formattedPrice}
          </p>
          <span className="rounded-full border border-[#D6CEC0] bg-[#EFEAE1] px-2.5 py-1 text-[0.63rem] font-semibold text-[#6D5E4C]">
            Workshop direct
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          <button
            className="cursor-pointer rounded-full border border-[#BFB5A4] bg-[#FAF8F5] px-3 py-2.5 text-xs font-semibold text-[#1F2022] transition duration-200 hover:bg-[#EBE3D5] active:scale-[0.97] disabled:cursor-not-allowed disabled:border-[#D6CEC0] disabled:bg-[#EBE3D5] disabled:text-[#86888D] sm:px-4"
            disabled={isInCart}
            onClick={() => addItem(product)}
            type="button"
          >
            {isInCart ? addedToCartLabel : addToCartLabel}
          </button>
          <a
            className="rounded-full bg-[#231F20] px-3 py-2.5 text-center text-xs font-semibold text-[#FAF8F5] shadow-[0_10px_24px_-6px_rgba(35,31,32,0.28)] transition duration-200 hover:bg-[#2D2F33] active:scale-[0.97] sm:px-4"
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
