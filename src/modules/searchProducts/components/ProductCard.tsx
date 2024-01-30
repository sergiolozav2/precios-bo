import { useState } from "react";
import { ProductType } from "../../../types/Product";
import { SupermarketAvatar } from "./SupermarketAvatar";
import { SvgIcon } from "../../../components/SvgIcon";

type ProductCardType = {
  product: ProductType;
  onFavoriteClick: () => void;
  isFavorite: boolean;
};
export function ProductCard(props: ProductCardType) {
  const product = props.product;

  const [imageSrc, setImageSrc] = useState(props.product.image);
  const imageFallback="./assets/fallback-image.png"

  const heartColor = props.isFavorite ? "fill-red-500 stroke-red-500" : "stroke-stone-500";
  return (
    <div className="relative flex flex-col justify-between">
      <button
        className="p-2 right-1.5 top-1.5 rounded-full absolute transition-colors hover:bg-stone-200"
        onClick={props.onFavoriteClick}
        aria-label="save favorite"
        role="checkbox"
        aria-checked={props.isFavorite}
      >
        <SvgIcon
          className={`${heartColor} h-4 fill-none stroke-[70px] overflow-visible`}
          iconName="FaHeart"
        />
      </button>
      <div className="flex w-full flex-col items-center">
        <div className="py-4 group w-full grid place-items-center cursor-pointer bg-stone-100">
          <a href={product.link} target="_blank">
            <img
              className="h-32 mix-blend-multiply group-hover:scale-110 transition-transform"
              alt={product.title}
              src={imageSrc}
              onError={() => setImageSrc(imageFallback)}
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
