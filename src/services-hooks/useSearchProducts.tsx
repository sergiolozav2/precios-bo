import { searchProducts } from "../services/searchProducts";
import { useApi } from "./useApi";

export function useSearchProducts(query: string) {
  const { data, loading, error, fetchData } = useApi({
    queryKey: ["search-products", query],
    queryFn: () => searchProducts(query),
  });

  return { data, loading, error, searchProducts: fetchData };
}
