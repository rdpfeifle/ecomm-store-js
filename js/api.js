/**
 * Fetch and filter products from an API based on specific categories.
 * @returns {Promise<Array>} - A promise that resolves to an array of filtered products.
 */
export const fetchProducts = async () => {
  try {
    const res = await fetch("https://fakestoreapi.com/products");

    if (!res.ok) {
      throw new Error(`Failed to fetch products. Status: ${response.status}`);
    }

    const products = await res.json();

    // Check and throw an error if not an array
    if (!Array.isArray(products)) {
      throw new Error("Not an array. Invalid format for the products data.");
    }

    const filteredByTwoCategories = products.filter(
      (product) =>
        product.category === "jewelery" ||
        product.category === "women's clothing"
    );

    return filteredByTwoCategories;
  } catch (error) {
    console.error(
      "Error occurred during product fetch operation: ",
      error.message
    );

    throw error;
  }
};
