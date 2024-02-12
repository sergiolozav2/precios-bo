import { useTranslation } from "react-i18next";
import { useSearchQueryParams } from "../hooks/useSearchQueryParams";
import { searchName } from "../SearchProductsPage";

type ProductsResults = {
  numberResults: number;
  children: React.ReactNode;
};
export function ProductsResults(props: ProductsResults) {
  const { getValue } = useSearchQueryParams();
  const { t } = useTranslation();
  const search = getValue(searchName, "");
  return (
    <div className="mt-4">
      <div className="mb-4 px-4 flex flex-col">
        <p className="text-lg sm:text-xl font-medium">
          {t("search.results.resultsFor")} '{search}'
        </p>
        <span className={`${props.numberResults?'':'invisible'} text-xs sm:text-sm text-stone-500`}>
          ({props.numberResults} {t("search.results.products")})
        </span>
      </div>
      {props.children}
    </div>
  );
}
