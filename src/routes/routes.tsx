import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { SearchProductsPage } from "../modules/searchProducts/SearchProductsPage";
import { Suspense } from "react";
import { ContactPage } from "../pages/ContactPage";
import { FunctionPage } from "./lazyModules";
import { SuspenseFallbackPage } from "../components/SuspenseFallbackPage";
import { routesNames } from "./routesNames";

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
        element: (
          <Suspense fallback={<SuspenseFallbackPage />}>
            <FunctionPage />
          </Suspense>
        ),
      },
      {
        path: routesNames.Contacto,
        element: <ContactPage />,
      },
    ],
  },
]);
