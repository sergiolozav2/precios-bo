import { ProductType } from "../../../types/Product";
import { useFavoriteProducts } from "../../favoriteProducts/providers/FavoriteProductsProvider";
import { NoResultsCard } from "./NoResultsCard";
import { ProductCard } from "./ProductCard";

type ProductsList = {
  products: ProductType[];
};
export function ProductsList(props: ProductsList) {
  const { saveOrDeleteProduct, products } = useFavoriteProducts();
  const items = props.products.length;
  if (items === 0) {
    return <NoResultsCard />;
  }

  return (
    <div className="grid gap-x-2 gap-y-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
      {props.products.map((product) => (
        <ProductCard
          key={product.title}
          product={product}
          onFavoriteClick={() => saveOrDeleteProduct(product)}
          isFavorite={!!products.find((p) => p.title === product.title)}
        />
      ))}
    </div>
  );
}
