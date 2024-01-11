import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { SearchProductsPage } from "../pages/SearchProductsPage";

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
        element: <SearchProductsPage />,
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
