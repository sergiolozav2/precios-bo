import { SvgIcon } from "../../components/SvgIcon";
import { FavoriteProductsContent } from "./FavoriteProductsContent";
import { useModal } from "./hooks/useModal";

export const FavoritesDialogURLName = "favoritesModal";
export function FavoriteProductsDialog() {
  const { toggleModal } = useModal(FavoritesDialogURLName);

  return (
    <div className="inset-0 top-auto rounded-t-md sm:w-[32rem] sm:left-auto sm:right-12 sm:bottom-3 fixed bg-stone-50">
      <div className="min-w-64 relative flex flex-col">
        <button
          className="absolute p-0.5 top-3 right-1.5 rounded-full hover:bg-stone-300"
          onClick={toggleModal}
        >
          <SvgIcon className="h-5" iconName="IoMdClose" />
        </button>
        <div className="py-3 min-h-32 h-full flex flex-col text-center">
          <h3 className="px-4 text-sm font-semibold"> Productos favoritos </h3>
          <FavoriteProductsContent />
        </div>
        <button
          className="px-4 py-2 sm:rounded-b-md font-medium bg-violet-900 text-stone-50"
          onClick={toggleModal}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
