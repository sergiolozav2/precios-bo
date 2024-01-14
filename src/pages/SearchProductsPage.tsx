import { useState } from "react";
import { PageHeaderWrapper } from "../components/PageHeaderWrapper";
import { useSearchProducts } from "../services-hooks/useSearchProducts";
import { ProductsList } from "../components/ProductsList";
import { LoadingWrapper } from "../components/LoadingWrapper";
import { ProductsListSkeleton } from "../components/ProductsListSkeleton";

export function SearchProductsPage() {
  const [search, setSearch] = useState("laptop");
  const { data, loading, searchProducts } = useSearchProducts(search);
  function handleSearchButton() {
    searchProducts(search);
  }
  function handleInput(event: React.FormEvent<HTMLInputElement>) {
    setSearch(event.currentTarget.value);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    handleSearchButton();
  }
  return (
    <>
      <PageHeaderWrapper>
        <div className="mt-8 py-8 px-6 flex text-center flex-col w-full items-center justify-center text-white">
          <h1 className="text-xl md:text-3xl font-bold">
            Comparador de precios Bolivia
          </h1>
          <h2 className="mt-2 text-lg md:text-xl">
            Busca y compara productos ofrecidos por tiendas online bolivianas
          </h2>
          <form
            className="mt-4 gap-2 max-w-96 w-full flex flex-col sm:flex-row justify-center"
            onSubmit={handleSubmit}
          >
            <input
              className="px-4 py-2 w-full rounded-lg outline-none text-black"
              onChange={handleInput}
              type="text"
              placeholder="Busca comida, bebidas, dulces..."
            />
            <LoadingWrapper className="rounded-lg" loading={loading}>
              <button
                className="px-2 py-2 w-full rounded-lg font-semibold bg-violet-900"
                onClick={handleSearchButton}
              >
                Buscar
              </button>
            </LoadingWrapper>
          </form>
        </div>
      </PageHeaderWrapper>
      <div className="mt-6 max-w-4xl mx-auto">
        {!loading && data && <ProductsList products={data.items} />}
        {loading && <ProductsListSkeleton quantity={9} />}
      </div>
    </>
  );
}
