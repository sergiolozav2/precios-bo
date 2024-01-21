import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { Icons, SvgIcon } from "../../components/SvgIcon";
import { useModal } from "../hooks/useModal";
import { FavoritesModalURLName } from "./FavoriteProductsModal";

type FloatingButtonType = {
  children: React.ReactNode;
};

export function FloatingButton(props: FloatingButtonType) {
  const { show, toggleModal } = useModal(FavoritesModalURLName);
  return (
    <div className="fixed right-12 bottom-3">
      <Dialog open={show}>
        <DialogTrigger asChild>
          <button
            className="rounded-full aspect-square sm:aspect-auto sm:rounded-md font-medium text-stone-50 bg-violet-900"
            onClick={toggleModal}
          >
            <div className="px-4 py-2 min-w-56 hidden sm:flex justify-between">
              <span> Mis favoritos </span>
              <SvgIcon
                className="h-5"
                iconName={Icons.MdKeyboardDoubleArrowUp}
              />
            </div>
            <div className="p-3 sm:hidden">
              <SvgIcon className="h-5" iconName={Icons.FaHeart}/>
            </div>
          </button>
        </DialogTrigger>
        <DialogPortal>
          <DialogOverlay className="inset-0 fixed bg-stone-900/10" />{" "}
          <DialogContent className="right-12 bottom-3 fixed">
            {props.children}
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </div>
  );
}
