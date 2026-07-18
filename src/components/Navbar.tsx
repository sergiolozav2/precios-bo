import { useTranslation } from "react-i18next";
import { routesNames } from "../routes/routesNames";
import { NavbarLink } from "./NavbarLink";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLocation } from "react-router-dom";
import { SvgIcon } from "./SvgIcon";
import { useState } from "react";

export function Navbar() {
  const { t } = useTranslation();
  const { search } = useLocation();
  const [openMenu, setOpenMenu] = useState(false);

  function handleToggleMenu() {
    setOpenMenu(!openMenu);
  }
  return (
    <nav className="p-4 absolute top-0 flex justify-between items-center w-full bg-transparent text-white">
      <div className="flex items-center">
        <div className="p-1.5 rounded-full bg-white ">
          <img src="/assets/logo.png" className="h-5" alt="PreciosBo Logo" />
        </div>
        <span className="ml-4 tracking-wide font-bold text-xl">PreciosBo</span>
      </div>

      <div className="relative">
        <button className="flex md:hidden" onClick={handleToggleMenu}>
          <SvgIcon iconName="MdMenu" className="h-6" />
        </button>
        <div className={`${openMenu?"-md:z-10 -md:absolute -md:right-0 -md:flex -md:flex-col -md:bg-purple-700 -md:border -md:border-purple-900 -md:px-8 -md:py-4 rounded-md gap-4":"-md:hidden"} md:flex md:gap-6 md:flex-row items-center`}>
          <NavbarLink
            label={t("navbar.start")}
            to={routesNames.Inicio + search}
          />
          <NavbarLink label={t("navbar.blog")} to={routesNames.Funcion} />
          <NavbarLink label={t("navbar.documentation")} to="/" />
          <NavbarLink label={t("navbar.contact")} to={routesNames.Contacto} />
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
}
