import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { SearchProductsPage } from "../pages/SearchProductsPage";
import { FunctionPage } from "../pages/FunctionPage";
import { ContactPage } from "../pages/ContactPage";

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
        element: <FunctionPage />,
      },
      {
        path: routesNames.Contacto,
        element: <ContactPage />,
      },
    ],
  },
]);
