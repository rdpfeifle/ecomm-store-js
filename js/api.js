/**
 * Fetch and filter products from an API based on specific categories.
 * @returns {Promise<Array>} - A promise that resolves to an array of filtered products.
 */
export const fetchProducts = async () => {
  const products = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
  );

  const filteredByTwoCategories = products.filter(
    (product) =>
      product.category === "jewelery" || product.category === "women's clothing"
  );

  return filteredByTwoCategories;
};
