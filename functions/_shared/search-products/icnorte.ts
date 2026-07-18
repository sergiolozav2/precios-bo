import type { SearchProductsService } from "./search-products-service";
import type { Product } from "./types";

export const DEFAULT_ICNORTE_SEARCH_URL =
  "https://www.icnorte.com/api/catalog_system/pub/products/search/busca";

const ICNORTE_URL = "https://www.icnorte.com";
const BROWSER_USER_AGENT =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36";

const workerFetch: typeof fetch = (input, init) =>
  globalThis.fetch(input, init);

export type IcnorteResponse = IcnorteProduct[];

export interface IcnorteProduct {
  productName?: string | null;
  productTitle?: string | null;
  link?: string | null;
  items?: (IcnorteItem | null)[] | null;
}

export interface IcnorteItem {
  name?: string | null;
  nameComplete?: string | null;
  images?: (IcnorteImage | null)[] | null;
  sellers?: (IcnorteSeller | null)[] | null;
}

export interface IcnorteImage {
  imageUrl?: string | null;
}

export interface IcnorteSeller {
  sellerDefault?: boolean | null;
  commertialOffer?: IcnorteCommercialOffer | null;
}

export interface IcnorteCommercialOffer {
  Price?: number | null;
  ListPrice?: number | null;
  AvailableQuantity?: number | null;
  IsAvailable?: boolean | null;
}

export interface IcnorteClient {
  search(query: string): Promise<IcnorteProduct[]>;
}

export class IcnorteSearchProductsService implements SearchProductsService {
  readonly source = "Icnorte" as const;

  constructor(private readonly client: IcnorteClient) {}

  async search(query: string): Promise<Product[]> {
    const products = await this.client.search(query);

    return products.flatMap((product) => {
      const title = productName(product);
      const link = nonEmptyString(product.link);
      const price = productPrice(product.items);

      if (title === undefined || link === undefined || price === undefined) {
        return [];
      }

      return [{
        title,
        price,
        image: productImage(product.items) ?? "",
        link,
        source: this.source,
      }];
    });
  }
}

export class HttpIcnorteClient implements IcnorteClient {
  constructor(
    private readonly searchUrl = DEFAULT_ICNORTE_SEARCH_URL,
    private readonly fetcher: typeof fetch = workerFetch,
  ) {}

  async search(query: string): Promise<IcnorteProduct[]> {
    const url = new URL(this.searchUrl);
    url.searchParams.set("O", "OrderByTopSaleDESC");
    url.searchParams.set("_from", "0");
    url.searchParams.set("_to", "7");
    url.searchParams.set("ft", query);
    url.searchParams.set("fq", "specificationFilter_24:");

    const referer = new URL("/busca", ICNORTE_URL);
    referer.searchParams.set("O", "OrderByTopSaleDESC");
    referer.searchParams.set("ft", query);
    referer.searchParams.set("pageNumber", "1");

    const response = await this.fetcher(urlWithPercentEncodedSpaces(url), {
      headers: {
        Accept: "application/json, text/plain, */*",
        Referer: referer.toString(),
        "User-Agent": BROWSER_USER_AGENT,
      },
    });

    if (!response.ok) {
      throw new Error(`Icnorte responded with HTTP ${response.status}`);
    }

    const data: unknown = await response.json();
    return Array.isArray(data) ? data.filter(isIcnorteProduct) : [];
  }
}

function productImage(items: unknown): string | undefined {
  if (!Array.isArray(items)) {
    return undefined;
  }

  for (const item of items) {
    if (!isRecord(item) || !Array.isArray(item.images)) {
      continue;
    }

    for (const image of item.images) {
      if (!isRecord(image)) {
        continue;
      }

      const imageUrl = nonEmptyString(image.imageUrl);
      if (imageUrl !== undefined) {
        return imageUrl;
      }
    }
  }

  return undefined;
}

function productName(product: IcnorteProduct): string | undefined {
  const topLevelName =
    nonEmptyString(product.productName) ??
    nonEmptyString(product.productTitle);

  if (topLevelName !== undefined || !Array.isArray(product.items)) {
    return topLevelName;
  }

  for (const item of product.items) {
    if (!isRecord(item)) {
      continue;
    }

    const itemName =
      nonEmptyString(item.nameComplete) ?? nonEmptyString(item.name);
    if (itemName !== undefined) {
      return itemName;
    }
  }

  return undefined;
}

function productPrice(items: unknown): number | undefined {
  if (!Array.isArray(items)) {
    return undefined;
  }

  for (const item of items) {
    if (!isRecord(item) || !Array.isArray(item.sellers)) {
      continue;
    }

    for (const seller of item.sellers) {
      if (!isRecord(seller) || !isRecord(seller.commertialOffer)) {
        continue;
      }

      const price = seller.commertialOffer.Price;
      if (typeof price === "number" && Number.isFinite(price) && price >= 0) {
        return price;
      }
    }
  }

  return undefined;
}

function nonEmptyString(value: unknown): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmedValue = value.trim();
  return trimmedValue.length > 0 ? trimmedValue : undefined;
}

function urlWithPercentEncodedSpaces(url: URL): string {
  return url.toString().replaceAll("+", "%20");
}

function isIcnorteProduct(value: unknown): value is IcnorteProduct {
  return isRecord(value);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
