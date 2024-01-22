import { productsEqual } from "../../types/Product";
import { ProductCard } from "../searchProducts/components/ProductCard";
import { useFavoriteProducts } from "./providers/FavoriteProductsProvider";

export function FavoriteProductsContent() {
  const { products, saveOrDeleteProduct } = useFavoriteProducts();
  const hasProducts = !(products.length === 0);

  if (!hasProducts) {
    return (
      <div className="flex-1 grid place-items-center">
        <p className="px-4 text-sm text-stone-800">
          No tienes productos favoritos guardados.
        </p>
      </div>
    );
  }
  return (
    <div className="flex-1 max-h-[36rem] gap-2 grid grid-cols-2 text-left overflow-auto">
      {products.map((product) => (
        <ProductCard
          key={product.title}
          product={product}
          onFavoriteClick={() => saveOrDeleteProduct(product)}
          isFavorite={!!products.find((p) => productsEqual(p, product))}
        />
      ))}
    </div>
  );
}
