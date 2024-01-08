describe("Homepage functionality and products visibility", () => {
  beforeEach(() => {
    cy.visit("../../index.html");
  });

  it("should correctly display the application's title", () => {
    cy.title().should("equal", "Urban Grace");
  });

  it("should have at least one product displayed in the products container", () => {
    cy.get("#products-container .product-container")
      .its("length")
      .should("be.greaterThan", 0);
  });

  it("should render product cards with all details", () => {
    cy.get("#products-container").each(($product) => {
      cy.wrap($product).find(".product-image").should("be.visible");
      cy.wrap($product).find(".product-title").should("be.visible");
      cy.wrap($product).find(".product-category").should("be.visible");
      cy.wrap($product).find(".product-price").should("be.visible");
      cy.wrap($product).find(".add-to-cart").should("be.visible");
    });
  });

  // should show the - [qty] + when clicking the 'Add to Cart'
  // the "add to cart" button should be invisible after clicking on it
  // should update UI state when 'Add to Cart' is clicked
  // should update product quantity in UI when modified
  // should allow to open the cart when clicking the cart button
});
