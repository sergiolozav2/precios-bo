import type { SearchProductsService } from "./search-products-service";
import type { Product } from "./types";

export const DEFAULT_GENIOX_SEARCH_URL =
  "https://www.elgeniox.com/api/trpc/search.searchProducts?batch=1";

const GENIOX_URL = "https://www.elgeniox.com";
const BROWSER_USER_AGENT =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36";

const workerFetch: typeof fetch = (input, init) =>
  globalThis.fetch(input, init);

export type GenioxResponse = GenioxResult[];

export interface GenioxResult {
  result: {
    data: GenioxData;
  };
}

export interface GenioxData {
  prices: GenioxPrices;
  categories: GenioxCategory[];
  brands: GenioxBrand[];
  sellers: GenioxSeller[];
  availableProducts: number;
  searchProducts: GenioxProduct[];
  totalSearchProducts: number;
}

export interface GenioxPrices {
  minPrice: number;
  maxPrice: number;
}

export interface GenioxCategory {
  categoryid: string;
  name: string;
  categoryparentid: unknown;
  description: string;
  externalcode: string;
  sellerid: string;
  slug: string;
}

export interface GenioxBrand {
  id: string;
  name: string;
  products: number;
}

export interface GenioxSeller {
  id: string;
  name: string;
  products: number;
}

export interface GenioxProduct {
  productId: string;
  name: string;
  description: string;
  whished: boolean;
  specialPrice: number;
  basePrice: number;
  stock: number;
  feature: string;
  productType: string;
  thumbnail: string;
  images: unknown[];
  sellerName: string;
  numberOfRatings: number;
  rating: number;
  slug: string;
  variants: GenioxVariant[];
  sellerId: string;
  sku: string;
  createdOn: number;
}

export interface GenioxVariant {
  variantId: string;
  variantName: string;
  sku: string;
  attributes: unknown[];
  height: number;
  length: number;
  weight: number;
  width: number;
}

export interface GenioxClient {
  search(query: string): Promise<GenioxProduct[]>;
}

export class GenioxSearchProductsService implements SearchProductsService {
  readonly source = "El GenioX" as const;

  constructor(private readonly client: GenioxClient) {}

  async search(query: string): Promise<Product[]> {
    const products = await this.client.search(query);

    return products.map((product) => ({
      title: product.name,
      price: product.specialPrice,
      image: product.thumbnail,
      link: `${GENIOX_URL}/products/${product.slug}`,
      source: this.source,
    }));
  }
}

export class HttpGenioxClient implements GenioxClient {
  constructor(
    private readonly searchUrl = DEFAULT_GENIOX_SEARCH_URL,
    private readonly fetcher: typeof fetch = workerFetch,
  ) {}

  async search(query: string): Promise<GenioxProduct[]> {
    const response = await this.fetcher(this.searchUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Origin: GENIOX_URL,
        Referer: `${GENIOX_URL}/search?query=${encodeURIComponent(query)}`,
        "User-Agent": BROWSER_USER_AGENT,
      },
      body: JSON.stringify({
        0: {
          type: query,
          page: 1,
          facets: [
            "seller",
            "best_price",
            "categories",
            "brand",
            "availability",
          ],
          filter: { stock: { gt: 0 } },
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`El GenioX responded with HTTP ${response.status}`);
    }

    const data = (await response.json()) as GenioxResponse;
    return data[0]?.result.data.searchProducts ?? [];
  }
}
