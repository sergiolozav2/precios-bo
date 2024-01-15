import { useEffect, useState } from "react";
import { searchProducts } from "../services/searchProducts";
import { useQuery } from "@tanstack/react-query";

export function useSearchProducts(initialQuery: string) {
  const [query, setQuery] = useState(initialQuery);
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["search-products", query],
    queryFn: () => searchProducts(query),
    enabled: false,
  });
  useEffect(() => {
    if (query !== "") {
      refetch();
    }
  }, [query, refetch]);
  return {
    data: data?.data,
    loading: isLoading,
    neverCalled: query === "" && !data && !isLoading,
    error,
    searchProducts: (newQuery: string) => setQuery(newQuery),
  };
}
