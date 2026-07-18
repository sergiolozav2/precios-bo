import type { SearchProductsService } from "./search-products-service";
import { rankProducts } from "./rank-products";
import type { Product, SearchProductsError, SearchProductsResult } from "./types";

export async function searchProducts(
  services: SearchProductsService[],
  query: string,
): Promise<SearchProductsResult> {
  const results = await Promise.allSettled(
    services.map(async (service) => ({
      source: service.source,
      items: await service.search(query),
    })),
  );

  const items: Product[] = [];
  const errors: SearchProductsError[] = [];

  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      items.push(...result.value.items);
      return;
    }

    errors.push({
      source: services[index].source,
      message: errorMessage(result.reason),
    });
  });

  return { items: rankProducts(items, query), errors };
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Unknown retailer error";
}
