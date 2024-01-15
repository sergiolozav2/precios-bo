import { SvgIcon } from "./SvgIcon";

type FeatureCardType = {
  title: string;
  description: string;
  iconName: string;
};

export function FeatureCard(props: FeatureCardType) {
  return (
    <div className="py-4 flex flex-col items-center text-center max-w-72">
      <div className="px-4 py-2 w-fit shadow-md shadow-stone-400 rounded-lg bg-[#581ecc]">
        <SvgIcon className="h-12 sm:h-20" iconName={props.iconName} />
      </div>
      <h2 className="mt-6 font-medium text-lg sm:text-2xl"> {props.title} </h2>
      <p className="mt-2 text-stone-600 text-base sm:text-xl"> {props.description} </p>
    </div>
  );
}
