import { useContext } from "react";
import { Context } from "./Provider";

export function useCustomContext() {
  const context = useContext(Context);
  if (!context) {
    throw new Error(
      "useFavoriteProducts must be used within a FavoriteProductsContext"
    );
  }
  return context;
}
