import { describe, expect, it, vi } from "vitest";
import {
  HipermaxiSearchProductsService,
  HttpHipermaxiClient,
  type HipermaxiClient,
  type HipermaxiProduct,
} from "../../../functions/_shared/search-products/hipermaxi";

describe("HipermaxiSearchProductsService", () => {
  it("maps Hipermaxi products to the shared product type", async () => {
    const products: HipermaxiProduct[] = [
      {
        IdProducto: "123",
        Descripcion: "Arroz Hipermaxi 1 kg",
        UrlFoto: "https://www.hipermaxi.com/images/arroz.jpg",
        PrecioVenta: 14.5,
      },
    ];
    const client: HipermaxiClient = {
      search: vi.fn().mockResolvedValue(products),
    };
    const service = new HipermaxiSearchProductsService(client);

    await expect(service.search("arroz")).resolves.toEqual([
      {
        title: "Arroz Hipermaxi 1 kg",
        link: "https://www.hipermaxi.com/",
        image: "https://www.hipermaxi.com/images/arroz.jpg",
        price: 14.5,
        source: "Hipermaxi",
      },
    ]);
    expect(client.search).toHaveBeenCalledWith("arroz");
  });

  it("calls the current store API and extracts Dato", async () => {
    const products: HipermaxiProduct[] = [
      {
        IdProducto: "123",
        Descripcion: "Arroz",
        UrlFoto: null,
        PrecioVenta: 14.5,
      },
    ];
    const fetcher = vi
      .fn<[string | Request | URL, RequestInit?], Promise<Response>>()
      .mockResolvedValue(
        Response.json({ ConError: false, Dato: products }),
      );
    const client = new HttpHipermaxiClient(
      "https://hipermaxi.test/productos",
      fetcher,
    );

    await expect(client.search("arroz integral")).resolves.toEqual(products);

    const [requestUrl, request] = fetcher.mock.calls[0];
    const url = new URL(String(requestUrl));
    expect(url.searchParams.get("IdMarket")).toBe("67");
    expect(url.searchParams.get("IdLocatario")).toBe("67");
    expect(url.searchParams.get("Descripcion")).toBe("arroz integral");
    expect(request?.headers).toMatchObject({
      "User-Agent": expect.stringContaining("Mozilla/5.0"),
    });
  });
});
