import { PageHeaderWrapper } from "../../components/PageHeaderWrapper";
import { useSearchProducts } from "./hooks/useSearchProducts";
import { LoadingWrapper } from "../../components/LoadingWrapper";
import { ContentProductPage } from "./ContentProductPage";
import { useSearchQueryParams } from "./hooks/useSearchQueryParams";
import { FloatingButton } from "../favoriteProducts/FloatingButton";
import { FavoriteProductsDialog } from "../favoriteProducts/FavoriteProductsDialog";
import { FavoriteProductsProvider } from "../favoriteProducts/providers/FavoriteProductsProvider";

export const searchName = "search";
export function SearchProductsPage() {
  const { getValue, updateQuery } = useSearchQueryParams();
  const searchValue = getValue(searchName, "");
  const { data, loading, neverCalled, searchProducts } =
    useSearchProducts(searchValue);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = formData.get(searchName)?.toString() ?? "";
    updateQuery(searchName, query);
    searchProducts(query);
  }
  return (
    <FavoriteProductsProvider>
      <PageHeaderWrapper>
        <div className="mt-2 sm:mt-8 py-8 px-6 flex text-center flex-col w-full items-center justify-center text-white">
          <h1 className="text-2xl sm:text-3xl font-semibold">
            Comparador de precios Bolivia
          </h1>
          <h2 className="mt-2 text-base sm:text-2xl">
            Busca y compara productos ofrecidos por tiendas online bolivianas
          </h2>
          <form
            className="mt-4 gap-2 max-w-[30rem] sm:text-xl w-full flex flex-col sm:flex-row justify-center"
            onSubmit={handleSubmit}
          >
            <input
              className="px-4 py-2 w-full rounded-lg outline-none text-black"
              defaultValue={searchValue}
              name={searchName}
              type="text"
              placeholder="Busca comida, bebidas, dulces..."
            />
            <LoadingWrapper className="rounded-lg" loading={loading}>
              <button className="px-2 py-2 w-full rounded-lg font-semibold bg-violet-900">
                Buscar
              </button>
            </LoadingWrapper>
          </form>
        </div>
      </PageHeaderWrapper>
      <div className="max-w-6xl mx-auto">
        <ContentProductPage
          data={data}
          loading={loading}
          neverCalled={neverCalled}
        />
      </div>
      <FloatingButton>
        <FavoriteProductsDialog />
      </FloatingButton>
    </FavoriteProductsProvider>
  );
}
