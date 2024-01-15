import { ProductType } from "../../../types/Product";
import { ProductCard } from "./ProductCard";

type ProductsList = {
  products: ProductType[];
};
export function ProductsList(props: ProductsList) {
  return (
    <div className="grid gap-x-2 gap-y-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
      {props.products.map((product) => (
        <ProductCard key={product.title} product={product} />
      ))}
    </div>
  );
}
