import { describe, expect, it, vi } from "vitest";
import {
  DismacSearchProductsService,
  HttpDismacClient,
  type DismacClient,
  type DismacProduct,
} from "../../../functions/_shared/search-products/dismac";

describe("DismacSearchProductsService", () => {
  it("maps Dismac products to the shared product type", async () => {
    const products: DismacProduct[] = [
      {
        name: "Televisor Samsung 50 pulgadas",
        url_key: "https://www.dismac.com.bo/televisor-samsung.html",
        image: "https://www.dismac.com.bo/media/televisor.jpg",
        price: "3,879.00",
      },
    ];
    const client: DismacClient = {
      search: vi.fn().mockResolvedValue(products),
    };
    const service = new DismacSearchProductsService(client);

    await expect(service.search("televisor")).resolves.toEqual([
      {
        title: "Televisor Samsung 50 pulgadas",
        link: "https://www.dismac.com.bo/televisor-samsung.html",
        image: "https://www.dismac.com.bo/media/televisor.jpg",
        price: 3_879,
        source: "Dismac",
      },
    ]);
    expect(client.search).toHaveBeenCalledWith("televisor");
  });

  it("calls the product feed and extracts its nested products", async () => {
    const products: DismacProduct[] = [
      {
        name: "Televisor",
        url_key: "https://www.dismac.com.bo/televisor.html",
        image: null,
        price: "2,299.00",
      },
    ];
    const fetcher = vi
      .fn<[string | Request | URL, RequestInit?], Promise<Response>>()
      .mockResolvedValue(
        Response.json({ response: { products } }),
      );
    const client = new HttpDismacClient(
      "https://dismac.test/productFeed",
      fetcher,
    );

    await expect(client.search("tv")).resolves.toEqual(products);

    const [url, request] = fetcher.mock.calls[0];
    expect(url).toBe("https://dismac.test/productFeed");
    expect(request?.method).toBe("POST");
    expect(JSON.parse(String(request?.body))).toMatchObject({ query: "tv" });
    expect(request?.headers).toMatchObject({
      "api-key": expect.any(String),
      "customer-uuid": expect.any(String),
    });
  });
});
