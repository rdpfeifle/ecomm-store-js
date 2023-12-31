import { createElementWithClass, appendChildren } from "./helpers.js";

const categoryAll = document.getElementById("all");
const womenCategory = document.getElementById("women");
const jewelryCategory = document.getElementById("jewelry");
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

  const filteredByTwoCategories = products.filter(
    (product) =>
      product.category === "jewelery" || product.category === "women's clothing"
  );

  return filteredByTwoCategories;
};

// Store the fetched products to reuse them in different functions.
const PRODUCTS = await fetchProducts();

/**
 * Populates the UI with filtered product elements based on fetched data.
 * Utilizes helper functions from helpers.js for creating and appending elements.
 * For more details on the helper functions, refer to the helpers.js file.
 * @returns {void}
 */
const filterProductsBy = async (category) => {
  const filteredProducts = PRODUCTS.filter((product) => {
    return category === "all" || product.category === category;
  });

  productsContainerEl.innerHTML = "";

  filteredProducts.forEach((product) => {
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

/**
 * Initializes event listeners for category buttons and utilizes the
 * filterProductsBy function to filter and display products based on
 * the selected category.
 * @returns {void}
 */
const showProductsByCategory = () => {
  // Display all products by default when the page loads
  filterProductsBy("all");

  // Event listener for the "All" button
  categoryAll.addEventListener("click", () => {
    filterProductsBy("all");
  });

  // Event listener for the "Women's Clothing" button
  womenCategory.addEventListener("click", () => {
    filterProductsBy("women's clothing");
  });

  // Event listener for the "Jewelry" button
  jewelryCategory.addEventListener("click", () => {
    filterProductsBy("jewelery");
  });
};

showProductsByCategory();
