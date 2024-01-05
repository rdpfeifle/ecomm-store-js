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

  it("should return an empty array when no products match the filter", () => {
    const nonMatchingProducts = products.filter(
      (product) =>
        product.category !== "jewelery" &&
        product.category !== "women's clothing"
    );

    expect(
      nonMatchingProducts.length,
      "The length of the array should be 0 when no products match"
    ).to.equal(0);
  });

  it("should return an array of objects", () => {
    expect(Array.isArray(products), "The result should be an array").to.be.true;

    // Check if each product is an object
    products.forEach((product, index) => {
      expect(product, `Product at index ${index} should be an object`).to.be.an(
        "object"
      );
    });
  });
});
