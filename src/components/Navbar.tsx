import { useTranslation } from "react-i18next";
import { routesNames } from "../routes/routesNames";
import { NavbarLink } from "./NavbarLink";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Navbar() {
  const { t } = useTranslation();

  return (
    <nav className="p-4 absolute top-0 flex justify-between items-center w-full bg-transparent text-white">
      <div className="flex items-center">
        <div className="p-1.5 rounded-full bg-white ">
          <img src="/assets/logo.png" className="h-5" alt="PreciosBo Logo" />
        </div>
        <span className="ml-4 tracking-wide font-bold text-xl">PreciosBo</span>
      </div>

      <div className="gap-6 hidden md:flex items-center">
        <NavbarLink label={t("navbar.start")} to={routesNames.Inicio} />
        <NavbarLink label={t("navbar.blog")} to={routesNames.Funcion} />
        <NavbarLink label={t("navbar.documentation")} to="/" />
        <NavbarLink label={t("navbar.contact")} to={routesNames.Contacto} />
        <LanguageSwitcher />
      </div>
    </nav>
  );
}
