import { Link } from "react-router-dom";

type NavbarLinkType = {
  label: string;
  to: string;
};

export function NavbarLink(props: NavbarLinkType) {
  return (
    <Link to={props.to} className="font-semibold">
      {props.label}
    </Link>
  );
}
