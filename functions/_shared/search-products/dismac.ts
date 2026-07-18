import type { SearchProductsService } from "./search-products-service";
import type { Product } from "./types";

export const DEFAULT_DISMAC_SEARCH_URL =
  "https://dx-dsm-search.dismac.com.bo/api/search/productFeed";

const DISMAC_AUTHORIZATION =
  "Bearer dfo1CSHf5AOwI2EA8oBsTLtclCX9GiK0gAUqCw84CBrJtBAEDIrgtWScNOdFuCfd";
const DISMAC_API_KEY = "y39SZEmVquMLYAFjrTcugSL2rBslseF1";
const DISMAC_CUSTOMER_UUID = "PFq5Z8Tqm7QRq/h1hpqQjA==";
const DISMAC_HOME_URL = "https://www.dismac.com.bo/";

const workerFetch: typeof fetch = (input, init) =>
  globalThis.fetch(input, init);

export type DismacProduct = {
  name: string | null;
  image: string | null;
  price: string | number | null;
  url_key: string | null;
};

type DismacResponse = {
  response?: {
    products?: DismacProduct[] | null;
  } | null;
};

export interface DismacClient {
  search(query: string): Promise<DismacProduct[]>;
}

export class DismacSearchProductsService implements SearchProductsService {
  readonly source = "Dismac" as const;

  constructor(private readonly client: DismacClient) {}

  async search(query: string): Promise<Product[]> {
    const products = await this.client.search(query);

    return products.map((product) => ({
      title: product.name ?? "Producto Dismac",
      price: parseDismacPrice(product.price),
      image: product.image ?? "",
      link: product.url_key ?? DISMAC_HOME_URL,
      source: this.source,
    }));
  }
}

export class HttpDismacClient implements DismacClient {
  constructor(
    private readonly searchUrl = DEFAULT_DISMAC_SEARCH_URL,
    private readonly fetcher: typeof fetch = workerFetch,
  ) {}

  async search(query: string): Promise<DismacProduct[]> {
    const response = await this.fetcher(this.searchUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: DISMAC_AUTHORIZATION,
        "Content-Type": "application/json",
        "api-key": DISMAC_API_KEY,
        "customer-uuid": DISMAC_CUSTOMER_UUID,
      },
      body: JSON.stringify({
        query,
        limit_search: "20",
        suggestions_limit: "3",
        history_limit: "3",
      }),
    });

    if (!response.ok) {
      throw new Error(`Dismac responded with HTTP ${response.status}`);
    }

    const data = (await response.json()) as DismacResponse;
    return data.response?.products ?? [];
  }
}

function parseDismacPrice(price: DismacProduct["price"]): number {
  if (typeof price === "number") {
    return price;
  }

  if (typeof price !== "string") {
    return 0;
  }

  const parsedPrice = Number(price.replaceAll(",", ""));
  return Number.isFinite(parsedPrice) ? parsedPrice : 0;
}
