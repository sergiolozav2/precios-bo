import { createContext } from "react";
import { useFavoriteProductsStorage } from "../../../hooks/useFavoriteProductsStorage";

type ContextType = ReturnType<typeof useFavoriteProductsStorage>;
export const Context = createContext<ContextType | null>(null);

type ProviderType = {
  children: React.ReactNode;
};
export function Provider(props: ProviderType) {
  const value = useFavoriteProductsStorage();

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
}
