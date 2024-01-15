import { ProductCardSkeleton } from "./ProductCardSkeleton";

type ProductsList = {
  quantity: number;
};
export function ProductsListSkeleton(props: ProductsList) {
  return (
    <div className="grid gap-x-2 gap-y-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
      {Array(props.quantity)
        .fill(0)
        .map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
    </div>
  );
}
