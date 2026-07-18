import { describe, expect, it } from "vitest";
import { rankProducts } from "../../../functions/_shared/search-products/rank-products";
import type { Product } from "../../../functions/_shared/search-products/types";

describe("rankProducts", () => {
  it("ranks exact titles and phrases before reordered and partial matches", () => {
    const products = [
      product("Coca"),
      product("Zero Coca Cola"),
      product("Bebida Coca Cola Zero 2L"),
      product("Coca Cola Zero"),
      product("Coca Cola"),
    ];

    expect(titles(rankProducts(products, "coca cola zero"))).toEqual([
      "Coca Cola Zero",
      "Bebida Coca Cola Zero 2L",
      "Zero Coca Cola",
      "Coca Cola",
      "Coca",
    ]);
  });

  it("normalizes case, accents, punctuation, and whitespace", () => {
    const products = [
      product("Oferta cafe molido 500 g"),
      product("Café-Molido"),
    ];

    expect(titles(rankProducts(products, "  CAFE   MOLIDO "))).toEqual([
      "Café-Molido",
      "Oferta cafe molido 500 g",
    ]);
  });

  it("matches whole words and keeps short query terms", () => {
    const products = [
      product("Pantalla Samsung 55 pulgadas"),
      product("Pan blanco"),
      product("TV Samsung 4K"),
      product("TV LG 4K"),
    ];

    expect(titles(rankProducts(products, "TV LG 4K")).slice(0, 2)).toEqual([
      "TV LG 4K",
      "TV Samsung 4K",
    ]);
    const panResults = titles(rankProducts(products, "pan"));
    expect(panResults[0]).toBe("Pan blanco");
    expect(panResults.indexOf("Pan blanco")).toBeLessThan(
      panResults.indexOf("Pantalla Samsung 55 pulgadas"),
    );
  });

  it("uses prefix matches for incomplete words below exact word matches", () => {
    const products = [product("Coca bebida"), product("Coca Cola")];

    expect(titles(rankProducts(products, "coca col"))).toEqual([
      "Coca Cola",
      "Coca bebida",
    ]);
  });

  it("prefers fewer unrelated words, then an earlier match", () => {
    const products = [
      product("Oferta especial Integral Arroz"),
      product("Arroz premium Integral"),
      product("Integral Arroz"),
    ];

    expect(titles(rankProducts(products, "arroz integral"))).toEqual([
      "Integral Arroz",
      "Arroz premium Integral",
      "Oferta especial Integral Arroz",
    ]);
  });

  it("uses price only to break equal-relevance ties", () => {
    const products = [
      product("Arroz Integral 1 kg", 20),
      product("Arroz Integral 1 kg", 15),
      product("Arroz", 1),
    ];

    expect(rankProducts(products, "arroz integral").map(({ price }) => price)).toEqual([
      15,
      20,
      1,
    ]);
  });

  it("does not mutate the retailer result array", () => {
    const products = [product("Arroz", 20), product("Arroz", 10)];

    const ranked = rankProducts(products, "arroz");

    expect(ranked).not.toBe(products);
    expect(products.map(({ price }) => price)).toEqual([20, 10]);
    expect(ranked.map(({ price }) => price)).toEqual([10, 20]);
  });
});

function product(title: string, price = 10): Product {
  return {
    title,
    price,
    image: "",
    link: `https://example.com/${encodeURIComponent(title)}`,
    source: "Hipermaxi",
  };
}

function titles(products: Product[]): string[] {
  return products.map(({ title }) => title);
}
