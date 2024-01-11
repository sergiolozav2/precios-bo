import { useState } from "react";
import { PageHeaderWrapper } from "../components/PageHeaderWrapper";
import { useSearchProducts } from "../services-hooks/useSearchProducts";

export function SearchProductsPage() {
  const [search, setSearch] = useState("");
  const { data, loading, searchProducts } = useSearchProducts(search);

  function handleSearchButton() {
    searchProducts();
  }
  function handleInput(event: React.FormEvent<HTMLInputElement>) {
    setSearch(event.currentTarget.value);
  }

  return (
    <>
      <PageHeaderWrapper>
        <div className="mt-16 px-6 flex text-center flex-col w-full items-center justify-center text-white">
          <h1 className="text-xl md:text-3xl font-bold">
            Comparador de precios Bolivia
          </h1>
          <h2 className="mt-2 text-lg md:text-xl">
            Busca y compara productos ofrecidos por distintos supermercados
            bolivianos
          </h2>
          <div className="mt-4 flex gap-2">
            <input
              className="px-4 py-2 rounded-lg text-lg outline-none text-black"
              onChange={handleInput}
              type="text"
              placeholder="Busca comida, bebidas, dulces..."
            />
            <button
              className="px-2 rounded-lg font-semibold bg-violet-900"
              onClick={handleSearchButton}
            >
              Buscar
            </button>
          </div>
        </div>
      </PageHeaderWrapper>
      <div> {loading ? "..." : JSON.stringify(data)}</div>
    </>
  );
}
