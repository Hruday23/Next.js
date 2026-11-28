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
    <header className="sticky top-0 z-40 border-b border-[#D6CEC0] bg-[#F5F0E8]/95 shadow-sm backdrop-blur-xl">
      <div className="bg-[#151618] px-4 py-2.5 text-xs text-[#F5F0E8]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-1 md:justify-between">
          <p className="flex items-center gap-2 tracking-wide">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#A89680]" />
            Raw weave to hand-block heirloom · Custom dyed in Telangana
          </p>
          <a
            className="hidden items-center gap-2 font-medium text-[#F5F0E8]/80 transition hover:text-white sm:flex"
            href="https://wa.me/918919100979?text=Namaste%20Bharathi%20Prints%2C%20I%20would%20like%20to%20enquire%20about%20custom%20hand-dyed%20sarees."
            rel="noopener noreferrer"
            target="_blank"
          >
            Direct atelier concierge <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          className="flex items-center gap-3 text-[#1F2022]"
          href={brandHref}
        >
          {brandLogoSrc ? (
            <img className="h-11 w-auto object-contain" src={brandLogoSrc} alt={brandName} />
          ) : (
            <span className="grid h-11 w-11 place-items-center rounded-2xl border border-[#8C7A65]/50 bg-[#1F2022] font-serif text-2xl text-[#F5F0E8]">
              B
            </span>
          )}
          <span>
            <span className="block font-serif text-xl font-bold uppercase leading-none tracking-wide sm:text-2xl">
              {brandName}
            </span>
            <span className="mt-1 block text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-[#6D5E4C]">
              Hand-dyed · Hand-blocked
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <nav
            aria-label={navigationLabel}
            className="hidden items-center gap-7 text-sm font-semibold text-[#5E6064] lg:flex"
          >
            {navLinks.map((link) => (
              <Link
                className="transition-colors hover:text-[#1F2022]"
                href={link.href}
                key={`${link.label}-${link.href}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <label className="hidden xl:block">
            <span className="sr-only">{searchLabel}</span>
            <input
              className="w-44 rounded-full border border-[#D6CEC0] bg-[#FAF8F5] px-4 py-2 text-sm text-[#1F2022] outline-none placeholder:text-[#86888D] focus:border-[#8C7A65] focus:ring-2 focus:ring-[#8C7A65]/20"
              placeholder={searchLabel}
              type="search"
            />
          </label>
          <Link
            className="inline-flex items-center gap-2 rounded-full border border-[#1F2022] bg-[#1F2022] px-4 py-2.5 text-sm font-semibold text-[#FAF8F5] transition hover:bg-[#2D2F33]"
            href={cartHref}
          >
            {cartLabel}
            <span className="grid min-w-5 place-items-center rounded-full bg-[#F5F0E8] px-1 text-xs font-bold text-[#1F2022]">
              {cartCount}
            </span>
          </Link>
        </div>
      </div>
      <nav
        aria-label={navigationLabel}
        className="flex gap-6 overflow-x-auto border-t border-[#D6CEC0]/70 px-4 py-2.5 text-xs font-semibold text-[#5E6064] lg:hidden sm:px-6"
      >
        {navLinks.map((link) => (
          <Link
            className="shrink-0 transition-colors hover:text-[#1F2022]"
            href={link.href}
            key={`${link.label}-mobile-${link.href}`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
