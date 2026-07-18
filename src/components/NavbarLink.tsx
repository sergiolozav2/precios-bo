import { Link } from "react-router-dom";

type NavbarLinkType = {
  label: string;
  to: string;
  external?: boolean;
};

export function NavbarLink(props: NavbarLinkType) {
  if (props.external) {
    return (
      <a
        href={props.to}
        className="font-semibold"
        target="_blank"
        rel="noreferrer"
      >
        {props.label}
      </a>
    );
  }

  return (
    <Link to={props.to} className="font-semibold">
      {props.label}
    </Link>
  );
}
