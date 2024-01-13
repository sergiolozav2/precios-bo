import { ProductType } from "../types/Product";
import { SupermarketAvatar } from "./SupermarketAvatar";

type ProductCardType = {
  product: ProductType;
};
export function ProductCard(props: ProductCardType) {
  const product = props.product;
  return (
    <div className="flex w-full flex-col items-center">
      <div className="py-4 group w-full grid place-items-center cursor-pointer bg-stone-100">
        <img
          className="h-32 mix-blend-multiply group-hover:scale-110 transition-transform"
          src={product.image}
        />
      </div>
      <div className="px-2 mt-2 w-full">
        <div className="mt-0.5 gap-2 flex items-center">
          <SupermarketAvatar marketName={product.source} />
          <span className="text-xs cursor-pointer hover:underline font-medium text-stone-500">{product.source}</span>
        </div>
        <div className="mt-2 text-sm"> {product.title} </div>
        <div className="mt-0.5 mb-2 font-bold"> {product.price} Bs</div>
      </div>
    </div>
  );
}
