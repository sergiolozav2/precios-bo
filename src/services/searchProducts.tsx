import { ProductType } from "../types/Product";
import { backend } from "./api";
import { ApiReturnType } from "./types";

export async function searchProducts(
  query: string
): ApiReturnType<{ items: ProductType[] }> {
  const response = await backend.get(
    `search_products/products?search=${query}`
  );
  return { data: response.data };
}
