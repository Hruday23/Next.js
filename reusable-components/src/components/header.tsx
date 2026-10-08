import type { ComponentType, ReactNode } from "react";

export interface HeaderLink {
  label: string;
  href: string;
}

export interface ReusableLinkProps {
  href: string;
  className?: string;
  children: ReactNode;
}

export interface HeaderProps {
  brandName: string;
  brandHref: string;
  brandLogoSrc?: string;
  navLinks: HeaderLink[];
  navigationLabel: string;
  searchLabel: string;
  cartLabel: string;
  cartCount?: number;
  cartHref: string;
  linkComponent?: ComponentType<ReusableLinkProps>;
}

function DefaultLink({ href, className, children }: ReusableLinkProps) {
  return (
    <a className={className} href={href}>
      {children}
    </a>
  );
}

export default function Header({
  brandName,
  brandHref,
  brandLogoSrc,
  navLinks,
  navigationLabel,
  searchLabel,
  cartLabel,
  cartCount = 0,
  cartHref,
  linkComponent: Link = DefaultLink,
}: HeaderProps) {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link className="flex items-center text-xl font-bold tracking-tight text-zinc-950" href={brandHref}>
          {brandLogoSrc ? (
            <img className="h-10 w-auto object-contain" src={brandLogoSrc} alt={brandName} />
          ) : (
            brandName
          )}
        </Link>

        <nav
          aria-label={navigationLabel}
          className="hidden items-center gap-6 text-sm font-medium text-zinc-600 md:flex"
        >
          {navLinks.map((link) => (
            <Link
              className="transition-colors hover:text-zinc-950"
              href={link.href}
              key={`${link.label}-${link.href}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-3 sm:flex-none">
          <label className="hidden sm:block">
            <span className="sr-only">{searchLabel}</span>
            <input
              className="w-48 rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm outline-none placeholder:text-zinc-400 focus:border-zinc-400"
              placeholder={searchLabel}
              type="search"
            />
          </label>
          <Link
            className="rounded-full bg-zinc-950 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700"
            href={cartHref}
          >
            {cartLabel} <span className="ml-1 text-zinc-300">({cartCount})</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
