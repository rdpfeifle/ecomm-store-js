import { fetchProducts } from "./api.js";
import {
  createElementWithClass,
  appendChildren,
  createButton,
} from "./helpers.js";
import { addToCart, updateCartQuantity, updateCartDisplay } from "./cart.js";

const categoryAll = document.getElementById("all");
const womenCategory = document.getElementById("women");
const jewelryCategory = document.getElementById("jewelry");
const productsContainerEl = document.getElementById("products-container");

// Store the fetched products to reuse them in different functions.
const PRODUCTS = await fetchProducts();

/**
 * Toggles the display of the `.quantity-container` and the `.add-to-cart` button.
 * When invoked, it sets the quantity counter to 1, hides the `.add-to-cart`
 * button, and displays the `.quantity-container` which includes the
 * decrement and increment buttons and the quantity display.
 * @param {Element} addToCartBtn - The `.add-to-cart` button element.
 * @param {Element} quantityContainer - The '.quantity-container' element for quantity display.
 * @param {Element} quantityCounter - The element that displays the quantity.
 */
const toggleQuantityDisplay = (
  addToCartBtn,
  quantityContainer,
  quantityCounter
) => {
  quantityCounter.textContent = 1;
  addToCartBtn.style.display = "none";
  quantityContainer.style.display = "flex";
};

/**
 * Increments the quantity displayed in the quantity counter.
 * This function parses the current quantity as an integer,
 * increments it by one, and updates the text content of the
 * quantity counter within the '.quantity-container'.
 * @param {Element} quantityCounter - The element within '.quantity-container' that displays the quantity.
 */
const incrementQuantity = (quantityCounter) => {
  let quantity = parseInt(quantityCounter.textContent, 10);
  quantity++;
  quantityCounter.textContent = quantity;

  return quantity;
};

/**
 * Decrements the quantity displayed in the quantity counter.
 * If the quantity is greater than 1, it decrements it by one.
 * If the quantity reaches 1, this function resets the counter,
 * hides the '.quantity-container', and shows the add-to-cart button.
 *
 * @param {Element} addToCartBtn - The `.add-to-cart` button element.
 * @param {Element} quantityContainer - The '.quantity-container' element for quantity display.
 * @param {Element} quantityCounter - The element within '.quantity-container' that displays the quantity.
 */
const decrementQuantity = (
  addToCartBtn,
  quantityContainer,
  quantityCounter
) => {
  let quantity = parseInt(quantityCounter.textContent, 10);

  if (quantity > 1) {
    quantity--;
    quantityCounter.textContent = quantity;
  } else {
    quantity = 0;
    quantityCounter.textContent = "";
    addToCartBtn.style.display = "block";
    quantityContainer.style.display = "none";
  }

  return quantity;
};

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
    quantityContainer.dataset.id = id;

    const quantityWrapper = createElementWithClass("div", "quantity-wrapper");
    const decrementBtn = createButton(
      "decrement-btn",
      "-",
      "Decrease quantity"
    );
    const quantityCounter = createElementWithClass("div", "qty-counter");
    quantityCounter.dataset.productId = id;
    const incrementBtn = createButton(
      "increment-btn",
      "+",
      "Increase quantity"
    );
    const addToCartBtn = createButton("add-to-cart", "Add to Cart");

    appendChildren(quantityWrapper, [
      decrementBtn,
      quantityCounter,
      incrementBtn,
    ]);

    quantityContainer.appendChild(quantityWrapper);

    appendChildren(productContainer, [
      imgContainer,
      productTitle,
      productCategory,
      productPrice,
      quantityContainer,
      addToCartBtn,
    ]);

    appendChildren(productsContainerEl, [productContainer]);

    addToCartBtn.addEventListener("click", () => {
      addToCart(product);
      toggleQuantityDisplay(addToCartBtn, quantityContainer, quantityCounter);
      updateCartDisplay(); // show the modal immediately

      console.log("Add to cart button clicked from products.js");
    });

    incrementBtn.addEventListener("click", () => {
      // update the UI and get the new quantity
      const newQuantity = incrementQuantity(quantityCounter);

      // update the cart
      updateCartQuantity(id, newQuantity);
      updateCartDisplay();

      console.log("Increment button clicked from products.js");
    });

    decrementBtn.addEventListener("click", () => {
      // update the UI and get the new quantity
      const newQuantity = decrementQuantity(
        addToCartBtn,
        quantityContainer,
        quantityCounter
      );

      // update the cart
      updateCartQuantity(id, newQuantity);
      updateCartDisplay();

      console.log("Decrement button clicked from products.js");
    });
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
