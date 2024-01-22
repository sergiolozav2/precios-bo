import { ProductType } from "../../../types/Product";
import { useFavoriteProducts } from "../../favoriteProducts/providers/FavoriteProductsProvider";
import { ProductCard } from "./ProductCard";

type ProductsList = {
  products: ProductType[];
};
export function ProductsList(props: ProductsList) {
  const query = "leche";
  const sortedProducts = props.products.sort((a, b) => {
    const titleA = a.title.toLowerCase();
    const titleB = b.title.toLowerCase();
    return (
      titleA.indexOf(query) * 2 + a.price - titleB.indexOf(query) * 2 - b.price
    );
  });

  const { saveOrDeleteProduct, products } = useFavoriteProducts();
  return (
    <div className="grid gap-x-2 gap-y-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
      {sortedProducts.map((product) => (
        <ProductCard
          key={product.title}
          product={product}
          imageFallback="./assets/fallback-image.png"
          onFavoriteClick={() => saveOrDeleteProduct(product)}
          isFavorite={!!products.find((p) => p.title === product.title)}
        />
      ))}
    </div>
  );
}
