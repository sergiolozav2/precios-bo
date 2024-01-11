import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { BuscadorProductos } from "../pages/BuscadorProductos";

export const routesNames = {
  Inicio: "/",
  Funcion: "/functions",
  Contacto: "/contact",
};

export const router = createBrowserRouter([
  {
    path: routesNames.Inicio,
    element: <App />,
    children: [
      {
        path: routesNames.Inicio,
        element: <BuscadorProductos />,
      },
      {
        path: routesNames.Funcion,
        element: <div> Fc </div>,
      },
      {
        path: routesNames.Contacto,
        element: <div> Conta </div>,
      },
    ],
  },
]);
