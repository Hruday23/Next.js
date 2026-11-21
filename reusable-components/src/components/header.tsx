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
    <header className="border-b border-[#e9dfd4] bg-[#fffdfa]">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link className="flex items-center text-xl font-bold tracking-tight text-[#342a24]" href={brandHref}>
          {brandLogoSrc ? (
            <img className="h-10 w-auto object-contain" src={brandLogoSrc} alt={brandName} />
          ) : (
            brandName
          )}
        </Link>

        <nav
          aria-label={navigationLabel}
          className="hidden items-center gap-6 text-sm font-medium text-[#6b5b50] md:flex"
        >
          {navLinks.map((link) => (
            <Link
              className="transition-colors hover:text-[#9b6848]"
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
              className="w-48 rounded-full border border-[#e2d7cc] bg-[#fbf8f4] px-4 py-2 text-sm text-[#342a24] outline-none placeholder:text-[#9a8b80] focus:border-[#9b6848] focus:ring-2 focus:ring-[#9b6848]/15"
              placeholder={searchLabel}
              type="search"
            />
          </label>
          <Link
            className="rounded-full bg-[#9b6848] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#805539]"
            href={cartHref}
          >
            {cartLabel} <span className="ml-1 text-[#d9c9bc]">({cartCount})</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
