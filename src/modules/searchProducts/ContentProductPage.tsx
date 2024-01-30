import { ProductType } from "../../types/Product";
import { ErrorCard } from "./components/ErrorCard";
import { FeaturesList } from "./components/FeaturesList";
import { ProductsList } from "./components/ProductsList";
import { ProductsListSkeleton } from "./components/ProductsListSkeleton";
import { ProductsResults } from "./components/ProductsResults";

type ContentProductPageType = {
  loading: boolean;
  neverCalled: boolean;
  data: { items: ProductType[] } | undefined;
  error: Error | null;
};

export function ContentProductPage(props: ContentProductPageType) {
  if (props.neverCalled) {
    return <FeaturesList />;
  }

  if (props.error) {
    return <ErrorCard />;
  }

  if (props.data && !props.loading) {
    return (
      <ProductsResults numberResults={props.data.items.length}>
        <ProductsList products={props.data.items} />
      </ProductsResults>
    );
  }

  return (
    <ProductsResults numberResults={0}>
      <ProductsListSkeleton quantity={9} />
    </ProductsResults>
  );
}
