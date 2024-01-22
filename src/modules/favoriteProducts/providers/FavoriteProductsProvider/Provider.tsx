import { useFavoriteProductsStorage } from "../../../hooks/useFavoriteProductsStorage";
import { Context } from "./Context";

type ProviderType = {
  children: React.ReactNode;
};
export function Provider(props: ProviderType) {
  const value = useFavoriteProductsStorage();

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
}
