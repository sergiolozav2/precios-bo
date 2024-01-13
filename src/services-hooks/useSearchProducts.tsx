import { useState } from "react";
import { searchProducts } from "../services/searchProducts";
import { useQuery } from "@tanstack/react-query";

export function useSearchProducts(initialQuery: string) {
  const [query, setQuery] = useState(initialQuery);
  const { data, isLoading, error } = useQuery({
    queryKey: ["search-products", query],
    queryFn: () => searchProducts(query),
  });
  return {
    data: data?.data,
    loading: isLoading,
    error,
    searchProducts: (newQuery: string) => setQuery(newQuery),
  };
}
