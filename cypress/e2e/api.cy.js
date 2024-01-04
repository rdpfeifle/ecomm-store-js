describe("fetchProducts function", () => {
  let productsResponse;
  let filteredProducts;

  beforeEach(() => {
    cy.request("GET", "https://fakestoreapi.com/products").then((res) => {
      productsResponse = res;
      filteredProducts = productsResponse.body.filter(
        (product) =>
          product.category === "jewelery" ||
          product.category === "women's clothing"
      );
    });
  });

  it("should have a response status of 200", () => {
    expect(productsResponse.status).to.eq(200);
  });

  it("should return products filtered by specified categories when API is successful", () => {
    const randomIndex = Math.floor(Math.random() * filteredProducts.length);
    const randomProduct = filteredProducts[randomIndex];

    expect(randomProduct.category).to.be.oneOf([
      "jewelery",
      "women's clothing",
    ]);
  });

  it("should return a filtered array of 10 products when API is successful", () => {
    expect(filteredProducts).to.have.lengthOf(10);
  });
});
