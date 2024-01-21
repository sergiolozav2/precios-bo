type SvgIconType = {
  className?: string;
  iconName: string;
};
export function SvgIcon(props: SvgIconType) {
  return (
    <img
      className={props.className}
      src={`./assets/svg/${props.iconName}.svg`}
    />
  );
}


