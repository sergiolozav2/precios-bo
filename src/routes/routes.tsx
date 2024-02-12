import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { SearchProductsPage } from "../modules/searchProducts/SearchProductsPage";
import { FunctionPage } from "../modules/guide_blog/FunctionPage";
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
