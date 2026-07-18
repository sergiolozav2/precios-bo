import type { Product, ProductSource } from "./types";

export interface SearchProductsService {
  readonly source: ProductSource;
  search(query: string): Promise<Product[]>;
}
