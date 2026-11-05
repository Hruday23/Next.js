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
      <>
        <p className="mt-3 text-zinc-600">{labels.empty}</p>
        <Link
          className="mt-6 inline-flex rounded-full bg-zinc-950 px-5 py-3 text-sm font-semibold text-white hover:bg-zinc-700"
          href={shopHref}
        >
          {labels.continueShopping}
        </Link>
      </>
    );
  }

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_20rem]">
      <ul className="divide-y divide-zinc-200">
        {items.map((item) => (
          <li className="flex gap-4 py-5 first:pt-0" key={item.id}>
            <div className="relative h-32 w-24 shrink-0 overflow-hidden rounded-lg bg-zinc-100">
              <Image alt={item.name} className="object-cover" fill sizes="96px" src={item.image} />
            </div>
            <div className="flex flex-1 items-start justify-between gap-4">
              <div>
                <h2 className="font-semibold text-zinc-950">{item.name}</h2>
                <p className="mt-1 text-sm text-zinc-600">{item.category}</p>
                <p className="mt-2 text-sm text-zinc-600">
                  {currency.format(item.price)} × {item.quantity}
                </p>
              </div>
              <button
                className="text-sm font-medium text-red-700 hover:text-red-900"
                onClick={() => removeItem(item.id)}
                type="button"
              >
                {labels.remove}
              </button>
            </div>
          </li>
        ))}
      </ul>

      <aside className="h-fit rounded-xl border border-zinc-200 p-6">
        <div className="flex justify-between gap-4 font-semibold text-zinc-950">
          <span>{labels.total}</span>
          <span>{currency.format(total)}</span>
        </div>
        <Link
          className="mt-6 inline-flex w-full justify-center rounded-full bg-zinc-950 px-5 py-3 text-sm font-semibold text-white hover:bg-zinc-700"
          href={shopHref}
        >
          {labels.continueShopping}
        </Link>
        <a
          className="mt-3 inline-flex w-full justify-center rounded-full bg-green-700 px-5 py-3 text-sm font-semibold text-white hover:bg-green-800"
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
