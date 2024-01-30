import { SvgIcon } from "../../../components/SvgIcon";

export function NoResultsCard() {
  return (
    <div className="px-4 mt-8 max-w-lg mx-auto">
        <div className="gap-2 flex-col-reverse sm:flex-row text-center sm:text-left flex justify-center items-center">
          <SvgIcon
            className="h-12 sm:block sm:h-24 text-stone-600"
            iconName="MdSearchOff"
          />
          <h2 className="text-lg sm:text-2xl font-semibold text-stone-700">
            No se encontró ningún resultado.
          </h2>
        </div>
    </div>
  );
}
