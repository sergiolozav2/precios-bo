import { PageHeaderWrapper } from "../components/PageHeaderWrapper";

export function SearchProductsPage() {
  return (
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
            type="text"
            placeholder="Busca comida, bebidas, dulces..."
          />
          <button className="px-2 rounded-lg font-semibold bg-violet-900">
            Buscar
          </button>
        </div>
      </div>
    </PageHeaderWrapper>
  );
}
