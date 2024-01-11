import { createBrowserRouter } from "react-router-dom"

export const routesNames = {
    Inicio: "/",
    Funcion: "/functions",
    Contacto: "/contact",
}


export const router = createBrowserRouter([
    {
        path: routesNames.Inicio,
        element: <div> Hola </div>
    },
    {
        path: routesNames.Funcion,
        element: <div> Fc </div>
    },
    {
        path: routesNames.Contacto,
        element: <div> Conta </div>
    },
])