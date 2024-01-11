export async function searchProducts(query: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {data: [query]};
}
