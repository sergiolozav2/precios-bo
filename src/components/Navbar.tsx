import { routesNames } from "../routes/routes";
import { NavbarLink } from "./NavbarLink";

export function Navbar() {
  return (
    <nav className="p-4 absolute top-0 flex justify-between items-center w-full bg-transparent text-white">
      <div className="flex items-center">
        <div className="p-1.5 rounded-full bg-white ">
          <img src="/assets/logo.png" className="h-5" alt="PreciosBo Logo" />
        </div>
        <span className="ml-4 tracking-wide font-bold text-xl">PreciosBo</span>
      </div>

      <div className="gap-6 hidden md:flex">
        <NavbarLink label="Inicio" to={routesNames.Inicio} />
        <NavbarLink label="Función" to={routesNames.Funcion} />
        <NavbarLink label="Documentación" to="/" />
        <NavbarLink label="Contacto" to={routesNames.Contacto} />
      </div>
    </nav>
  );
}
