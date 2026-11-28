import type { SareeCardProduct } from "../components/saree-card";

export type StorefrontLocale = "en" | "te" | "hi";

interface SareesApiResponse {
  success: boolean;
  count: number;
  data: SareeCardProduct[];
}

export async function getSarees(locale: StorefrontLocale): Promise<SareeCardProduct[]> {
  const configuredApiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!configuredApiUrl) {
    console.warn("Could not load sarees: NEXT_PUBLIC_API_URL is not configured");
    return [];
  }

  const apiBaseUrl = configuredApiUrl.replace(/\/$/, "");

  try {
    const response = await fetch(`${apiBaseUrl}/api/sarees?lang=${locale}`, {
      cache: "force-cache",
    });

    if (!response.ok) {
      console.warn(`Could not load sarees: backend returned HTTP ${response.status}`);
      return [];
    }

    const result: SareesApiResponse = await response.json();
    if (!result.success || !Array.isArray(result.data)) {
      console.warn("Could not load sarees: backend returned an invalid catalog response");
      return [];
    }

    return result.data;
  } catch (error) {
    console.warn("Could not load sarees: backend request failed", error);
    return [];
  }
}
