"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "./cart-provider";

interface CartContentProps {
  locale: string;
  labels: {
    empty: string;
    remove: string;
    continueShopping: string;
    total: string;
    orderOnWhatsApp: string;
  };
  shopHref: string;
}

export default function CartContent({ locale, labels, shopHref }: CartContentProps) {
  const { items, removeItem } = useCart();
  const currency = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const orderMessage = [
    "I would like to order these products:",
    ...items.flatMap((item) => [
      "",
      `Product: ${item.name}`,
      `Quantity: ${item.quantity}`,
      `Price: ${currency.format(item.price)} each`,
      `Image: ${item.image}`,
    ]),
    "",
    `Total: ${currency.format(total)}`,
  ].join("\n");
  const whatsappUrl = `https://wa.me/918919100979?text=${encodeURIComponent(orderMessage)}`;

  if (items.length === 0) {
    return (
      <div>
        <p className="mt-3 text-[#5E6064]">{labels.empty}</p>
        <Link
          className="mt-6 inline-flex rounded-full bg-[#1F2022] px-5 py-3 text-sm font-semibold text-[#F5F0E8] hover:bg-[#2D2F33]"
          href={shopHref}
        >
          {labels.continueShopping}
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_20rem]">
      <ul className="divide-y divide-[#D6CEC0]">
        {items.map((item) => (
          <li className="flex gap-4 py-5 first:pt-0" key={item.id}>
            <div className="relative h-32 w-24 shrink-0 overflow-hidden rounded-xl bg-[#EBE3D5]">
              <Image alt={item.name} className="object-cover" fill sizes="96px" src={item.image} />
            </div>
            <div className="flex flex-1 items-start justify-between gap-4">
              <div>
                <h2 className="font-serif text-lg font-semibold text-[#1F2022]">{item.name}</h2>
                <p className="mt-1 text-sm text-[#5E6064]">{item.category}</p>
                <p className="mt-2 text-sm text-[#5E6064]">
                  {currency.format(item.price)} × {item.quantity}
                </p>
              </div>
              <button
                className="text-sm font-medium text-[#1F2022] underline decoration-[#8C7A65] underline-offset-4 hover:text-[#6D5E4C]"
                onClick={() => removeItem(item.id)}
                type="button"
              >
                {labels.remove}
              </button>
            </div>
          </li>
        ))}
      </ul>

      <aside className="h-fit rounded-3xl border border-[#D6CEC0] bg-[#FAF8F5]/80 p-6">
        <div className="flex justify-between gap-4 font-semibold text-[#1F2022]">
          <span>{labels.total}</span>
          <span>{currency.format(total)}</span>
        </div>
        <Link
          className="mt-6 inline-flex w-full justify-center rounded-full bg-[#1F2022] px-5 py-3 text-sm font-semibold text-[#F5F0E8] hover:bg-[#2D2F33]"
          href={shopHref}
        >
          {labels.continueShopping}
        </Link>
        <a
          className="mt-3 inline-flex w-full justify-center rounded-full bg-[#8C7A65] px-5 py-3 text-sm font-semibold text-[#FAF8F5] hover:bg-[#6D5E4C]"
          href={whatsappUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          {labels.orderOnWhatsApp}
        </a>
      </aside>
    </div>
  );
}
