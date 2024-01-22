import { useSearchParams } from "react-router-dom";

export function useModal(name: string) {
  const [searchParams, setSearchParams] = useSearchParams();
  const show = searchParams.get(name) === "true";
  function toggleModal() {
    const value = !show ? "true" : "";
    setSearchParams((params) => {
      if (value === "") {
        params.delete(name);
      } else {
        params.set(name, value);
      }
      return params;
    });
  }

  return { toggleModal, show };
}
