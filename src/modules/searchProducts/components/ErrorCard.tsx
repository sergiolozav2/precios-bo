import { useTranslation } from "react-i18next";
import { SvgIcon } from "../../../components/SvgIcon";

export function ErrorCard() {
  const { t } = useTranslation();
  function handleReload() {
    window.location.reload();
  }
  return (
    <div className="mt-8 max-w-lg mx-auto items-center flex-col-reverse sm:flex-row flex">
      <SvgIcon
        className="hidden sm:block sm:h-24 text-stone-600"
        iconName="MdQueryBuilder"
      />
      <div className="ml-4 flex flex-col gap-2">
        <div className="flex items-center">
          <SvgIcon
            className="h-8 mr-2 sm:hidden text-stone-600"
            iconName="MdQueryBuilder"
          />

          <h2 className="text-lg sm:text-2xl font-semibold text-stone-700">
            {t("search.error.title")}&nbsp; :(
          </h2>
        </div>
        <p className="sm:text-lg text-stone-800">
          <button
            className="sm:text-lg font-semibold w-fit underline"
            onClick={handleReload}
          >
            {t("search.error.reload")}
          </button>
          &nbsp;{t("search.error.description")}
        </p>
      </div>
    </div>
  );
}
