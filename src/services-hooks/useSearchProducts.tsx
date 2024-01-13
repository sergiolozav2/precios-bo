import { searchProducts } from "../services/searchProducts";
import { useApi } from "./useApi";
import { ProductType } from "../types/Product";

export function useSearchProducts(query: string) {
  const { data, loading, error, fetchData } = useApi<ProductType[]>({
    queryKey: ["search-products", query],
    queryFn: () => searchProducts(query),
  });
  return {
    data,
    loading,
    error,
    searchProducts: fetchData,
  };
}
