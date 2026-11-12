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
export default function Header({ brandName, brandHref, brandLogoSrc, navLinks, navigationLabel, searchLabel, cartLabel, cartCount, cartHref, linkComponent: Link, }: HeaderProps): import("react").JSX.Element;
//# sourceMappingURL=header.d.ts.map