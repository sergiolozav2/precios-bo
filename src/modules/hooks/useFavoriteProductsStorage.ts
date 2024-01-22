import { useState } from "react";
import { ProductType, productsEqual } from "../../types/Product";

const productsKey = "products";
export function useFavoriteProductsStorage() {
  const [products, setProducts] = useState(() =>
    getFavoritesFromLocalStorage()
  );

  function saveOrDeleteProduct(product: ProductType) {
    const index = products.findIndex((p) => productsEqual(p, product));

    let newProducts: ProductType[] = [];

    if (index === -1) {
      newProducts = [product, ...products];
    } else {
      products.splice(index, 1);
      newProducts = products;
    }

    setProducts([...newProducts]);
    localStorage.setItem(productsKey, JSON.stringify(newProducts));
  }

  function getFavoritesFromLocalStorage() {
    const favoritesString = localStorage.getItem(productsKey);
    let favorites: ProductType[] = [];
    if (favoritesString) {
      favorites = JSON.parse(favoritesString);
    }
    return favorites;
  }
  return { products, saveOrDeleteProduct };
}
