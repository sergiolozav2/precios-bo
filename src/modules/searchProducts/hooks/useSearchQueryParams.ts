import { useSearchParams } from "react-router-dom";

export function useSearchQueryParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  function updateQuery(name: string, value: string) {
    setSearchParams({ [name]: value });
  }

  function getValue(name: string, defaultParam: string) {
    return searchParams.get(name) ?? defaultParam;
  }

  return { getValue, updateQuery };
}
