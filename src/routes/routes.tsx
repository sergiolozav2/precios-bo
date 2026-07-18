import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { SearchProductsPage } from "../modules/searchProducts/SearchProductsPage";
import { Suspense } from "react";
import { ContactPage } from "../pages/ContactPage";
import { BlogPage } from "./lazyModules";
import { SuspenseFallbackPage } from "../components/SuspenseFallbackPage";
import { routesNames } from "./routesNames";
import { NotFoundPage } from "../pages/NotFoundPage";
import { RouteErrorPage } from "../pages/RouteErrorPage";

export const router = createBrowserRouter([
  {
    path: routesNames.Inicio,
    element: <App />,
    errorElement: <RouteErrorPage />,
    children: [
      {
        path: routesNames.Inicio,
        element: <SearchProductsPage />,
      },
      {
        path: routesNames.Blog,
        element: (
          <Suspense fallback={<SuspenseFallbackPage />}>
            <BlogPage />
          </Suspense>
        ),
      },
      {
        path: routesNames.Contacto,
        element: <ContactPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
