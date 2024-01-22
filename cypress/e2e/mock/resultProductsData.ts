import { ProductType } from "../../../src/types/Product";

const imageData =
  "data:image/png;base64,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";
export const resultProductsData: { data: { items: ProductType[] } } = {
  data: {
    items: [
      {
        image: imageData,
        link: "www.link.com",
        price: 100,
        source: "www.source.com",
        title: "Product 1",
      },
      {
        image: imageData,
        link: "www.link.com",
        price: 100,
        source: "www.source.com",
        title: "Product 2",
      },
      {
        image: imageData,
        link: "www.link.com",
        price: 100,
        source: "www.source.com",
        title: "Product 3",
      },
    ],
  },
};
