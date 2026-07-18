import { describe, expect, it, vi } from "vitest";
import {
  GenioxSearchProductsService,
  HttpGenioxClient,
  type GenioxClient,
  type GenioxProduct,
} from "../../../functions/_shared/search-products/geniox";

describe("GenioxSearchProductsService", () => {
  it("maps GenioX products to the shared product type", async () => {
    const products = [genioxProduct()];
    const client: GenioxClient = {
      search: vi.fn().mockResolvedValue(products),
    };
    const service = new GenioxSearchProductsService(client);

    await expect(service.search("tv")).resolves.toEqual([
      {
        title: 'TV TCL 43" 32S5K',
        price: 3_099,
        image: "https://images.test/tv.jpg",
        link: "https://www.elgeniox.com/products/tv-tcl-43-32s5k",
        source: "El GenioX",
      },
    ]);
    expect(client.search).toHaveBeenCalledWith("tv");
  });

  it("calls the tRPC endpoint and extracts its search products", async () => {
    const products = [genioxProduct()];
    const fetcher = vi
      .fn<[string | Request | URL, RequestInit?], Promise<Response>>()
      .mockResolvedValue(
        Response.json([{ result: { data: { searchProducts: products } } }]),
      );
    const client = new HttpGenioxClient(
      "https://elgeniox.test/api/trpc/search?batch=1",
      fetcher,
    );

    await expect(client.search("tv oled")).resolves.toEqual(products);

    const [url, request] = fetcher.mock.calls[0];
    expect(url).toBe("https://elgeniox.test/api/trpc/search?batch=1");
    expect(request?.method).toBe("POST");
    expect(JSON.parse(String(request?.body))).toEqual({
      0: {
        type: "tv oled",
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
    });
    expect(request?.headers).toMatchObject({
      Origin: "https://www.elgeniox.com",
      Referer: "https://www.elgeniox.com/search?query=tv%20oled",
      "User-Agent": expect.stringContaining("Mozilla/5.0"),
    });
  });
});

function genioxProduct(
  overrides: Partial<GenioxProduct> = {},
): GenioxProduct {
  return {
    productId: "product-id",
    name: 'TV TCL 43" 32S5K',
    description: "Google TV",
    whished: false,
    specialPrice: 3_099,
    basePrice: 3_299,
    stock: 10,
    feature: "",
    productType: "Product",
    thumbnail: "https://images.test/tv.jpg",
    images: [],
    sellerName: "elgeniox Store",
    numberOfRatings: 0,
    rating: 0,
    slug: "tv-tcl-43-32s5k",
    variants: [],
    sellerId: "seller-id",
    sku: "123",
    createdOn: 1_757_003_270_205,
    ...overrides,
  };
}
