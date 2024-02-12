import { useTranslation } from "react-i18next";
import { SvgIcon } from "../../components/SvgIcon";
import { FavoriteProductsContent } from "./FavoriteProductsContent";
import { useModal } from "./hooks/useModal";

export const FavoritesDialogURLName = "favoritesModal";
export function FavoriteProductsDialog() {
  const { toggleModal } = useModal(FavoritesDialogURLName);
  const { t } = useTranslation();

  return (
    <div className="inset-0 top-auto rounded-t-xl sm:w-[32rem] sm:left-auto sm:right-12 sm:bottom-3 fixed bg-stone-50">
      <div className="min-w-64 relative flex flex-col">
        <button
          className="absolute p-0.5 top-3.5 right-1.5 rounded-full transition-colors hover:bg-stone-300"
          onClick={toggleModal}
          aria-label={t("favorites.dialog.close")}
        >
          <SvgIcon className="h-5" iconName="IoMdClose" />
        </button>
        <div className="min-h-32 h-full flex flex-col text-center">
          <h3 className="my-4 px-4 text-sm font-semibold">
            {t("favorites.dialog.title")}
          </h3>
          <FavoriteProductsContent />
        </div>
        <button
          className="mt-4 px-4 py-2 sm:rounded-b-md font-medium bg-violet-900 text-stone-50"
          onClick={toggleModal}
        >
          {t("favorites.dialog.close")}
        </button>
      </div>
    </div>
  );
}
