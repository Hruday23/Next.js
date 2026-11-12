"use client";

import { Header, type HeaderProps } from "@hruday23/reusable";
import Link from "next/link";
import { useCart } from "./cart-provider";

type CartHeaderProps = Omit<HeaderProps, "cartCount" | "linkComponent">;

export default function CartHeader(props: CartHeaderProps) {
  const { items } = useCart();
  const cartCount = items.reduce((total, item) => total + item.quantity, 0);

  return <Header {...props} cartCount={cartCount} linkComponent={Link} />;
}
