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
export default function Footer({ brandName, brandHref, brandLogoSrc, description, columns, copyright, legalLinks, linkComponent: Link, }: FooterProps): import("react").JSX.Element;
//# sourceMappingURL=footer.d.ts.map