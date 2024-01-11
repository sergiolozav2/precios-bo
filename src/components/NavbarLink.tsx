type NavbarLinkType = {
    label: string,
    to: string,
};

export function NavbarLink(props: NavbarLinkType) {
  return <div className="font-semibold">{props.label}</div>;
}
