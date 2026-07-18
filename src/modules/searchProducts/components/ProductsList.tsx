import { ProductType } from "../../../types/Product";
import { useFavoriteProducts } from "../../favoriteProducts/providers/FavoriteProductsProvider";
import { useSearchQueryParams } from "../hooks/useSearchQueryParams";
import { searchName } from "../utils/urlQueryNames";
import { NoResultsCard } from "./NoResultsCard";
import { ProductCard } from "./ProductCard";

type ProductsList = {
  products: ProductType[];
};
export function ProductsList(props: ProductsList) {
  const { getValue } = useSearchQueryParams();
  const query = getValue(searchName, "").toLowerCase();
  const sortedProducts = props.products.sort(sortProductsFn(query));
  const { saveOrDeleteProduct, products } = useFavoriteProducts();
  const items = props.products.length;
  if (items === 0) {
    return <NoResultsCard />;
  }

  return (
    <div className="grid gap-x-2 gap-y-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
      {sortedProducts.map((product) => (
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

function sortProductsFn(query: string) {
  return (a: ProductType, b: ProductType) => {
    const titleA = a.title.toLowerCase();
    const titleB = b.title.toLowerCase();
    query = query.toLowerCase();

    const partialMatch = calculatePartialMatch(query, titleA, titleB);
    const goodPrice = a.price - b.price;
    return partialMatch * 20 + goodPrice;
  };
}
function calculatePartialMatch(query: string, titleA: string, titleB: string) {
  const terms = query.split(" ");
  let score = 0;
  terms.forEach((term) => {
    if (term.length > 2) {
      score += calculateScore(term, titleB) - calculateScore(term, titleA);
    }
  });
  return score;
}

function calculateScore(query: string, title: string) {
  const indexA = title.indexOf(query);
  const length = title.length;
  return indexA === -1 ? 0 : length - indexA;
}
