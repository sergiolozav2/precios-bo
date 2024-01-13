import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

type useApiOptions = {
  queryFn: () => unknown;
  queryKey: string[];
};

type UseApiReturnType<T> =
  | {
      data: T;
    }
  | undefined;
export function useApi<T>(options: useApiOptions) {
  const [data, setData] = useState<UseApiReturnType<T>>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(undefined);
  const queryClient = useQueryClient();
  async function fetchData() {
    setLoading(true);
    try {
      const cache = await queryClient.ensureQueryData(options);
      if (cache) {
        setData(cache as UseApiReturnType<T>);
      } else {
        const data = await queryClient.fetchQuery(options);
        setData(data as UseApiReturnType<T>);
      }
    } catch (error) {
      setData(undefined);
      setError(error);
    } finally {
      setLoading(false);
    }
  }
  if (data?.data) {
    return { data: data.data, error, loading, fetchData };
  }
  return { error, loading, fetchData };
}
