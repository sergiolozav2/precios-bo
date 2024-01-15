import { ProductType } from "../../types/Product";
import { FeaturesList } from "./components/FeaturesList";
import { ProductsList } from "./components/ProductsList";
import { ProductsListSkeleton } from "./components/ProductsListSkeleton";

type ContentProductPageType = {
  loading: boolean;
  neverCalled: boolean;
  data: { items: ProductType[] } | undefined;
};

export function ContentProductPage(props: ContentProductPageType) {
  if (props.neverCalled) {
    return <FeaturesList />;
  }

  if (props.data && !props.loading) {
    return <ProductsList products={props.data.items} />;
  }

  return <ProductsListSkeleton quantity={9} />;
}
