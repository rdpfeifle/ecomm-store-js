import { fetchProducts } from "../../js/api.js";

describe("fetchProducts function", () => {
  let products;

  beforeEach(async () => {
    products = await fetchProducts();
  });

  it("should return a non-empty array", () => {
    expect(Array.isArray(products), "The result should be an array").to.be.true;

    // The array should have at least one product
    expect(
      products.length,
      "The length of the array should be at least 1"
    ).to.be.at.least(1);
  });

  it("should return products filtered by specified categories", () => {
    // Every product should be of these two categories
    const allProductsMatch = products.every(
      (product) =>
        product.category === "jewelery" ||
        product.category === "women's clothing"
    );

    expect(
      allProductsMatch,
      "All products should be in the specified categories"
    ).to.be.true;
  });
});
