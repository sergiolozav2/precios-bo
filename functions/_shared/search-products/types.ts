export type ProductSource = "Dismac" | "El GenioX" | "Hipermaxi" | "Icnorte";

export type Product = {
  image: string;
  title: string;
  link: string;
  source: ProductSource;
  price: number;
};

export type SearchProductsError = {
  source: ProductSource;
  message: string;
};

export type SearchProductsResult = {
  items: Product[];
  errors: SearchProductsError[];
};
