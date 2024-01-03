import {
  createElementWithClass,
  appendChildren,
  createButton,
} from "./helpers.js";

const cartQtySpan = document.querySelector(".cart-container span");
const cartBtn = document.querySelector(".cart-container");
const cartModal = document.getElementById("cart-modal");
const closeModal = document.getElementById("close-modal");
const cartItemsContainer = document.getElementById("cart-items-container");
const cartTotalContainer = document.getElementById("cart-total-container");
const totalPriceEl = document.getElementById("total-price");
const productQuantity = document.getElementById("product-quantity");

let cart = [];

/**
 * Finds the index of a product in the cart by its ID.
 * @param {number} productId - The ID of the product to find.
 * @returns {number} - The index of the product in the cart or -1 if not found.
 */
const findProductIndexInCart = (productId) => {
  return cart.findIndex((item) => item.id === productId);
};

/**
 * Updates the UI to display the current total quantity of items in the cart.
 * It sums up the quantities of **all** items in the cart and updates the text
 * content of the cart quantity span to reflect this total.
 * @returns {void}
 */
const updateCartCountUI = () => {
  const totalItems = cart.reduce((total, item) => total + item.qtyInCart, 0);
  cartQtySpan.textContent = `(${totalItems})`;
};

/**
 * This function is used for the initial addition of a product to the cart.
 * After adding the product, it updates the UI to reflect the current
 * total quantity of items in the cart by calling `updateCartCountUI`.
 *
 * If the product is **already** in the cart, the function
 * DOESN'T modify the existing quantity (`updateCartQuantity` does that).
 * @param {Object} product - The product object to add to the cart.
 * This object should contain at least the product's ID, and may include
 * other details such as `title` and `price`.
 * @returns {void}
 */

const addToCart = (product) => {
  const productIndex = findProductIndexInCart(product.id);

  if (productIndex < 0) {
    cart.push({ ...product, qtyInCart: 1 });
  }

  updateCartCountUI();
};

/**
 * Updates the quantity of a specific product in the cart.
 * If the new quantity is greater than zero, it updates the product's quantity.
 * If the new quantity is zero, it removes the product from the cart.
 * After updating, it calls `updateCartCountUI` to refresh the cart count display.
 * @param {number} productId - The ID of the product to update.
 * @param {number} newQuantity - The new quantity to set for the product.
 * @returns {void}
 */
const updateCartQuantity = (productId, newQuantity) => {
  const productIndex = findProductIndexInCart(productId);

  if (productIndex >= 0) {
    cart[productIndex].qtyInCart = newQuantity;

    if (newQuantity === 0) {
      cart.splice(productIndex, 1);
    }

    updateCartCountUI();
  }
};

const removeFromCart = (productId) => {
  return;
};

/**
 * Calculates and displays the total price and quantity of items in the cart.
 * The total price is formatted as a currency value in US dollars, and the
 * total quantity is displayed as a simple count. Updates the respective
 * elements in the UI with these values.
 * @returns {void} - This function does not return a value; it updates the
 * UI directly.
 */
const calculateTotal = () => {
  let totalQuantity = 0;

  const totalPrice = cart.reduce((total, item) => {
    totalQuantity += item.qtyInCart;

    return total + item.price * item.qtyInCart;
  }, 0);

  totalPriceEl.textContent = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(totalPrice);

  totalQuantity === 1
    ? (productQuantity.textContent = `${totalQuantity} product`)
    : (productQuantity.textContent = `${totalQuantity} products`);
};

/**
 * This function updates and displays the content of the cart modal.
 * by showing each item with its details.
 * @returns {void} - primarily updates the UI.
 */
const displayCartProducts = () => {
  cart.forEach((item) => {
    const { id, title, category, image, price, qtyInCart } = item;
    const itemContainer = createElementWithClass("div", "cart-item");

    const itemTitle = createElementWithClass("h5", "cart-item-title");
    itemTitle.textContent = title;

    const itemCategory = createElementWithClass("p", "cart-item-category");
    itemCategory.textContent = category === "jewelery" ? "jewelry" : category;

    const imgContainer = createElementWithClass("div", "cart-img-container");
    const itemImg = createElementWithClass("img", "cart-item-img");
    itemImg.src = image;
    itemImg.alt = title;

    imgContainer.appendChild(itemImg);

    const itemPrice = createElementWithClass("p", "cart-item-price");
    itemPrice.textContent = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price * qtyInCart);

    const itemQtyWrapper = createElementWithClass("div", "item-qty-wrapper");
    const decrementBtn = createButton(
      "item-decrement-btn",
      "-",
      "Decrease quantity"
    );

    const itemQuantity = createElementWithClass("div", "cart-item-qty");
    itemQuantity.textContent = qtyInCart;

    const incrementBtn = createButton(
      "item-increment-btn",
      "+",
      "Increase quantity"
    );

    const itemDetailsContainer = createElementWithClass(
      "div",
      "item-details-container"
    );

    appendChildren(itemQtyWrapper, [decrementBtn, itemQuantity, incrementBtn]);

    appendChildren(itemDetailsContainer, [
      itemTitle,
      itemCategory,
      itemPrice,
      itemQtyWrapper,
    ]);

    appendChildren(itemContainer, [imgContainer, itemDetailsContainer]);

    cartItemsContainer.appendChild(itemContainer);

    calculateTotal();

    decrementBtn.addEventListener("click", () => {
      updateProductQty(id, false);
    });
    incrementBtn.addEventListener("click", () => {
      updateProductQty(id, true);
    });
  });
};

/**
 * Checks if the cart is empty and updates the UI accordingly.
 * If the cart is empty, it displays a message indicating this.
 * Otherwise, it calls the function `displayCartProducts` to
 * display the cart products.
 * @returns {void} - Updates the UI based on the cart's content.
 */
const updateCartDisplay = () => {
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartTotalContainer.style.display = "none";
    const emptyCartMessage = createElementWithClass("p", "empty-cart-message");
    emptyCartMessage.textContent = "Your cart is empty.";
    cartItemsContainer.appendChild(emptyCartMessage);
  } else {
    cartTotalContainer.style.display = "block";
    displayCartProducts();
  }
};

/**
 * Adjusts the quantity of a product in the cart and updates the UI
 * by calling `updateCartCountUI` and `displayCartProducts`.
 * Increments or decrements the product's quantity based on the `isIncrement`.
 * If decrementing leads to a quantity of zero, it removes the product from the cart.
 * @param {number} productId - The ID of the product to update.
 * @param {boolean} isIncrement - True to increment quantity, false to decrement.
 */
const updateProductQty = (productId, isIncrement) => {
  const productIndex = findProductIndexInCart(productId);

  const quantityContainer = document.querySelector(
    `.quantity-container[data-id="${productId}"]`
  );
  const quantityCounter = document.querySelector(
    `.qty-counter[data-product-id="${productId}"]`
  );

  const productContainer = document.querySelector(`[data-id="${productId}"]`);
  const addToCartBtn = productContainer.querySelector(".add-to-cart");

  if (productId >= 0) {
    if (isIncrement) {
      cart[productIndex].qtyInCart += 1;
    } else {
      if (cart[productIndex].qtyInCart > 1) {
        cart[productIndex].qtyInCart -= 1;
      } else {
        cart.splice(productIndex, 1);
        quantityContainer.style.display = "none";
        addToCartBtn.style.display = "block";
      }
    }

    if (quantityCounter) {
      // If productIndex is valid, set the textContent to the quantity in cart.
      quantityCounter.textContent = cart[productIndex]
        ? cart[productIndex].qtyInCart
        : "";
    }

    updateCartCountUI();
    updateCartDisplay();
  }
};

const toggleCartModal = () => {
  cartModal.style.display === "block"
    ? (cartModal.style.display = "none")
    : (cartModal.style.display = "block");
};

// When the user clicks the cart, it should open the modal
cartBtn.addEventListener("click", toggleCartModal);

// When the user clicks the "X", it should close the modal
closeModal.addEventListener("click", toggleCartModal);

updateCartDisplay();

export { addToCart, updateCartQuantity, updateCartDisplay };
