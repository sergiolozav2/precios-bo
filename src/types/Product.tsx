export type ProductType = {
  image: string;
  title: string;
  link: string;
  source: string;
  price: number;
};

/**
 * I don't use ProductType.image because it changes sometimes
 */
export function productsEqual(a: ProductType, b: ProductType) {
  return (
    a.title === b.title &&
    a.price === b.price &&
    a.source === b.source &&
    a.link === b.link
  );
}
