import { fetchProducts } from "../../js/api.js";

describe("fetchProducts function", () => {
  let products;

  beforeEach(async () => {
    products = await fetchProducts();
  });

  it("should return products filtered by specified categories", () => {
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
