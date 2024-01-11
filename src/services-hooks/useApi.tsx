import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

type useApiOptions = {
  queryFn: () => void;
  queryKey: string[];
};

export function useApi(options: useApiOptions) {
  const [data, setData] = useState<unknown>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(undefined);
  const queryClient = useQueryClient();
  async function fetchData() {
    setLoading(true);
    try {
      const cache = await queryClient.ensureQueryData<unknown>(options);
      if (cache) {
        setData(cache);
      } else {
        const data = await queryClient.fetchQuery(options);
        setData(data);
      }
    } catch (error) {
      setData(undefined);
      setError(error);
    } finally {
      setLoading(false);
    }
  }
  return { data, error, loading, fetchData };
}
