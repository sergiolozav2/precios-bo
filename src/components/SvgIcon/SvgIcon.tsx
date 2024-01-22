import { Icons } from "./SvgAllIconPaths"

type SvgIconType = {
  className?: string;
  iconName: keyof typeof Icons;
};

export function SvgIcon(props: SvgIconType) {
  const icon = Icons[props.iconName];
  return (
    <svg
      className={`${props.className} w-fit aspect-square`}
      viewBox={icon.viewBox}
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="0"
      height="200px"
      width="200px"
      xmlns="http://www.w3.org/2000/svg"
    >
      {icon.path}
    </svg>
  );
}
