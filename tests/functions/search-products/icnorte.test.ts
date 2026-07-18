import { describe, expect, it, vi } from "vitest";
import {
  HttpIcnorteClient,
  IcnorteSearchProductsService,
  type IcnorteClient,
  type IcnorteProduct,
} from "../../../functions/_shared/search-products/icnorte";

describe("IcnorteSearchProductsService", () => {
  it("maps the fields present in the Icnorte response", async () => {
    const products: IcnorteProduct[] = [icnorteProduct()];
    const client: IcnorteClient = {
      search: vi.fn().mockResolvedValue(products),
    };
    const service = new IcnorteSearchProductsService(client);

    await expect(service.search("leche")).resolves.toEqual([
      {
        title: "Leche Evaporada Bella Holandesa 410 Gr",
        price: 25.1,
        image: "https://images.test/leche.jpg",
        link: "https://www.icnorte.com/leche-evaporada/p",
        source: "Icnorte",
      },
    ]);
    expect(client.search).toHaveBeenCalledWith("leche");
  });

  it("handles incomplete products without inventing required data", async () => {
    const client: IcnorteClient = {
      search: vi.fn().mockResolvedValue([
        icnorteProduct({ items: [{ sellers: [{ commertialOffer: {} }] }] }),
        icnorteProduct({ link: null }),
        icnorteProduct({
          productName: null,
          productTitle: null,
          items: [{
            nameComplete: "Leche Pil sin imagen",
            sellers: [{ commertialOffer: { Price: 12 } }],
          }],
        }),
      ]),
    };
    const service = new IcnorteSearchProductsService(client);

    await expect(service.search("leche")).resolves.toEqual([
      {
        title: "Leche Pil sin imagen",
        price: 12,
        image: "",
        link: "https://www.icnorte.com/leche-evaporada/p",
        source: "Icnorte",
      },
    ]);
  });

  it("requests only the initial result page and safely parses the response", async () => {
    const product = icnorteProduct();
    const fetcher = vi
      .fn<[string | Request | URL, RequestInit?], Promise<Response>>()
      .mockResolvedValue(Response.json([product, null, "invalid"]));
    const client = new HttpIcnorteClient(
      "https://icnorte.test/api/search",
      fetcher,
    );

    await expect(client.search("leche entera")).resolves.toEqual([product]);

    const [requestUrl, request] = fetcher.mock.calls[0];
    expect(String(requestUrl)).toContain("ft=leche%20entera");
    expect(String(requestUrl)).not.toContain("ft=leche+entera");
    const url = new URL(String(requestUrl));
    expect(url.searchParams.get("O")).toBe("OrderByTopSaleDESC");
    expect(url.searchParams.get("_from")).toBe("0");
    expect(url.searchParams.get("_to")).toBe("7");
    expect(url.searchParams.get("ft")).toBe("leche entera");
    expect(url.searchParams.get("fq")).toBe("specificationFilter_24:");
    expect(request?.headers).toMatchObject({
      Accept: "application/json, text/plain, */*",
      Referer: expect.stringContaining("pageNumber=1"),
      "User-Agent": expect.stringContaining("Mozilla/5.0"),
    });
  });

  it("returns no products when the upstream payload is not an array", async () => {
    const fetcher = vi
      .fn<[string | Request | URL, RequestInit?], Promise<Response>>()
      .mockResolvedValue(Response.json({ products: [] }));
    const client = new HttpIcnorteClient(
      "https://icnorte.test/api/search",
      fetcher,
    );

    await expect(client.search("leche")).resolves.toEqual([]);
  });
});

function icnorteProduct(
  overrides: Partial<IcnorteProduct> = {},
): IcnorteProduct {
  return {
    productName: "Leche Evaporada Bella Holandesa 410 Gr",
    link: "https://www.icnorte.com/leche-evaporada/p",
    items: [
      {
        images: [{ imageUrl: "https://images.test/leche.jpg" }],
        sellers: [{ commertialOffer: { Price: 25.1 } }],
      },
    ],
    ...overrides,
  };
}
