import { createElementWithClass, appendChildren } from "./helpers.js";

const productsCategory = document.getElementById("categories-filter");
const productsContainerEl = document.getElementById("products-container");

// add objects containing the id, title, quantity, price, total for each
// let productsInCart = [];

/**
 * Fetch and filter products from an API based on specific categories.
 * @returns {Promise<Array>} - A promise that resolves to an array of filtered products.
 */
const fetchProducts = async () => {
  const products = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
  );

  const filteredProducts = products.filter(
    (product) =>
      product.category === "jewelery" || product.category === "women's clothing"
  );

  return filteredProducts;
};

// Store the fetched products to reuse them in different functions.
const PRODUCTS = await fetchProducts();

const filterCategories = () => {
  // display categories "All", "Women's Clothing" and "Jewelry"
  // filter the products
};

/**
 * Populates the UI with product elements based on fetched data.
 * Utilizes helper functions from helpers.js for creating and appending elements.
 * For more details on the helper functions, refer to the helpers.js file.
 * @returns {void}
 */
const showProducts = async () => {
  PRODUCTS.forEach((product) => {
    const { id, image, title, price } = product;
    const category =
      product.category === "jewelery" ? "jewelry" : product.category;

    const productContainer = createElementWithClass("div", "product-container");
    productContainer.dataset.id = id;

    const imgContainer = createElementWithClass("div", "img-container");
    const productImg = createElementWithClass("img", "product-image");
    productImg.src = image;
    productImg.alt = title;
    imgContainer.appendChild(productImg);

    const productTitle = createElementWithClass("h3", "product-title");
    productTitle.textContent = title;

    const productCategory = createElementWithClass("p", "product-category");
    productCategory.textContent = category;

    const productPrice = createElementWithClass("p", "product-price");
    productPrice.textContent = `$${price}`;

    const quantityContainer = createElementWithClass(
      "div",
      "quantity-container"
    );
    const decrementBtn = createElementWithClass("button", "decrement-btn");
    decrementBtn.textContent = "-";
    const quantityCounter = createElementWithClass("div", "qty-counter");
    const incrementBtn = createElementWithClass("button", "increment-btn");
    incrementBtn.textContent = "+";

    const addToCartBtn = createElementWithClass("button", "add-to-cart");
    addToCartBtn.textContent = "Add to Cart";

    appendChildren(quantityContainer, [
      decrementBtn,
      quantityCounter,
      incrementBtn,
    ]);

    appendChildren(productContainer, [
      imgContainer,
      productTitle,
      productCategory,
      productPrice,
      quantityContainer,
      addToCartBtn,
    ]);

    appendChildren(productsContainerEl, [productContainer]);
  });
};

showProducts();
