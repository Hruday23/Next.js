export type Locale = "en" | "te" | "hi";

export interface SareeTranslation {
  name: string;
  category: string;
  description: string;
}

export interface SareeRecord {
  id: string;
  price: number;
  image: string;
  translations: Record<Locale, SareeTranslation>;
}
