import { useState } from "react";
import { ProductType } from "../../../types/Product";
import { SupermarketAvatar } from "./SupermarketAvatar";

type ProductCardType = {
  product: ProductType;
  imageFallback: string;
};
export function ProductCard(props: ProductCardType) {
  const product = props.product;

  const [imageSrc, setImageSrc] = useState(props.product.image)
  return (
    <div className="flex flex-col justify-between">
      <div className="flex w-full flex-col items-center">
        <div className="py-4 group w-full grid place-items-center cursor-pointer bg-stone-100">
          <a href={product.link} target="_blank">
            <img
              className="h-32 mix-blend-multiply group-hover:scale-110 transition-transform"
              alt={product.title}
              src={imageSrc}
              onError={() => setImageSrc(props.imageFallback)}
            />
          </a>
        </div>
        <div className="px-2 mt-2 w-full">
          <div className="mt-0.5 gap-2 flex items-center">
            <SupermarketAvatar marketName={product.source} />
            <a
              className="text-xs cursor-pointer hover:underline font-medium text-stone-500"
              href={product.link}
              target="_blank"
            >
              {product.source}
            </a>
          </div>
          <div className="mt-2 text-sm"> {product.title} </div>
        </div>
      </div>
      <div className="mt-0.5 px-2 font-bold"> {product.price} Bs</div>
    </div>
  );
}
