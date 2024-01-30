import { SvgIcon } from "../../../components/SvgIcon";

export function ErrorCard() {
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
            Ocurrió un problema&nbsp; :(
          </h2>
        </div>
        <p className="sm:text-lg text-stone-800">
          Y no se pudo realizar la búsqueda,&nbsp;
          <button
            className="sm:text-lg font-semibold w-fit hover:underline"
            onClick={handleReload}
          >
            intentalo de nuevo
          </button>
          &nbsp;o regresa más tarde.
        </p>
      </div>
    </div>
  );
}
