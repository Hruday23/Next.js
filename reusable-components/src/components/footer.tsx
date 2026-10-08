import type { ComponentType } from "react";
import type { ReusableLinkProps } from "./header";

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface FooterProps {
  brandName: string;
  brandHref: string;
  brandLogoSrc?: string;
  description: string;
  columns: FooterColumn[];
  copyright: string;
  legalLinks: FooterLink[];
  linkComponent?: ComponentType<ReusableLinkProps>;
}

function DefaultLink({ href, className, children }: ReusableLinkProps) {
  return (
    <a className={className} href={href}>
      {children}
    </a>
  );
}

export default function Footer({
  brandName,
  brandHref,
  brandLogoSrc,
  description,
  columns,
  copyright,
  legalLinks,
  linkComponent: Link = DefaultLink,
}: FooterProps) {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link
              className="flex items-center text-xl font-bold tracking-tight text-zinc-950"
              href={brandHref}
            >
              {brandLogoSrc ? (
                <img className="h-12 w-auto object-contain" src={brandLogoSrc} alt={brandName} />
              ) : (
                brandName
              )}
            </Link>
            <p className="mt-4 text-sm leading-6 text-zinc-600">
              {description}
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {columns.map((column) => (
              <div key={column.title}>
                <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-zinc-950">
                  {column.title}
                </h3>
                <ul className="mt-4 space-y-3 text-sm text-zinc-600">
                  {column.links.map((link) => (
                    <li key={`${column.title}-${link.label}`}>
                      <Link className="transition-colors hover:text-zinc-950" href={link.href}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-zinc-200 pt-6 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {brandName}. {copyright}
          </p>
          <div className="flex items-center gap-4">
            {legalLinks.map((link) => (
              <Link className="hover:text-zinc-950" href={link.href} key={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
