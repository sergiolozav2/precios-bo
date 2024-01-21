import { Icons, SvgIcon } from "../../components/SvgIcon";
import { useModal } from "../hooks/useModal";

export const FavoritesModalURLName = "favoritesModal";
export function FavoriteProductsModal() {
  const { toggleModal } = useModal(FavoritesModalURLName);
  return (
    <div className="min-w-64 relative flex flex-col rounded-t-md bg-stone-50">
      <button className="absolute top-2.5 right-2" onClick={toggleModal}>
        <SvgIcon className="h-5" iconName={Icons.IoMdClose} />
      </button>
      <div className="py-2 min-h-32 flex flex-col text-center">
        <h3 className="px-4 text-sm font-semibold"> Productos favoritos </h3>
        <div className="py-4 flex-1 flex items-center">
          <p className="px-4 text-sm text-stone-800">
            No tienes productos favoritos guardados
          </p>
        </div>
      </div>
      <button
        className="px-4 py-2 rounded-b-md font-medium bg-violet-900 text-stone-50"
        onClick={toggleModal}
      >
        Cerrar
      </button>
    </div>
  );
}
