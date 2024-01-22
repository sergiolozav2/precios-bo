import { createContext } from "react";
import { useFavoriteProductsStorage } from "../../hooks/useFavoriteProductsStorage";

type ContextType = ReturnType<typeof useFavoriteProductsStorage>;
export const Context = createContext<ContextType | null>(null);