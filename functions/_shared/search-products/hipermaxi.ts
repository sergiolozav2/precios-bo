import type { SearchProductsService } from "./search-products-service";
import type { Product } from "./types";

export const DEFAULT_HIPERMAXI_SEARCH_URL =
  "https://hipermaxi.com/tienda-api/api/v1/public/productos";

const HIPERMAXI_HOME_URL = "https://www.hipermaxi.com/";
const BROWSER_USER_AGENT =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36";

const workerFetch: typeof fetch = (input, init) =>
  globalThis.fetch(input, init);

export type HipermaxiProduct = {
  IdProducto: string | null;
  Descripcion: string | null;
  PrecioVenta: number | null;
  UrlFoto: string | null;
};

type HipermaxiResponse = {
  Dato?: HipermaxiProduct[] | null;
};

export interface HipermaxiClient {
  search(query: string): Promise<HipermaxiProduct[]>;
}

export class HipermaxiSearchProductsService implements SearchProductsService {
  readonly source = "Hipermaxi" as const;

  constructor(private readonly client: HipermaxiClient) {}

  async search(query: string): Promise<Product[]> {
    const products = await this.client.search(query);

    return products.map((product) => ({
      title: product.Descripcion ?? "Producto Hipermaxi",
      price: product.PrecioVenta ?? 0,
      image: product.UrlFoto ?? "",
      link: HIPERMAXI_HOME_URL,
      source: this.source,
    }));
  }
}

export class HttpHipermaxiClient implements HipermaxiClient {
  constructor(
    private readonly searchUrl = DEFAULT_HIPERMAXI_SEARCH_URL,
    private readonly fetcher: typeof fetch = workerFetch,
  ) {}

  async search(query: string): Promise<HipermaxiProduct[]> {
    const url = new URL(this.searchUrl);
    url.searchParams.set("IdMarket", "67");
    url.searchParams.set("IdLocatario", "67");
    url.searchParams.set("Pagina", "1");
    url.searchParams.set("Cantidad", "50");
    url.searchParams.set("Descripcion", query);

    const response = await this.fetcher(url, {
      headers: {
        Accept: "application/json",
        "User-Agent": BROWSER_USER_AGENT,
      },
    });

    if (!response.ok) {
      throw new Error(`Hipermaxi responded with HTTP ${response.status}`);
    }

    const data = (await response.json()) as HipermaxiResponse;
    return data.Dato ?? [];
  }
}
