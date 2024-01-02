import { createElementWithClass, appendChildren } from "./helpers.js";

const cartQtySpan = document.querySelector(".cart-container span");
const cartBtn = document.querySelector(".cart-container");
const cartModal = document.getElementById("cart-modal");
const closeModal = document.getElementById("close-modal");
const cartItemsContainer = document.getElementById("cart-items-container");

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
 *
 * If the new quantity is greater than zero, it updates the product's quantity.
 * If the new quantity is zero, it removes the product from the cart.
 *
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

const calculateTotal = () => {
  return;
};

const updateCartModal = () => {
  // Clear the current contents of the cart items
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    // If the cart is empty, show a message
    const emptyCartMessage = createElementWithClass("p", "empty-cart-message");
    emptyCartMessage.textContent = "Your cart is empty.";
    cartItemsContainer.appendChild(emptyCartMessage);
  } else {
    cart.forEach((item) => {
      const { id, title, image, price, qtyInCart } = item;
      const itemContainer = createElementWithClass("div", "cart-item");

      const imgContainer = createElementWithClass("div", "cart-img-container");
      const itemImg = createElementWithClass("img", ".cart-item-img");
      itemImg.src = image;
      itemImg.alt = title;

      imgContainer.appendChild(itemImg);

      const itemTitle = createElementWithClass("h5", "cart-item-title");
      itemTitle.textContent = title;

      const itemPrice = createElementWithClass("p", "cart-item-price");
      itemPrice.textContent = `$${price * qtyInCart}`;

      const itemQtyWrapper = createElementWithClass("div", "item-qty-wrapper");
      const decrementBtn = createElementWithClass(
        "button",
        "item-decrement-btn"
      );
      decrementBtn.textContent = "-";
      const itemQuantity = createElementWithClass("div", "cart-item-qty");
      itemQuantity.textContent = qtyInCart;
      const incrementBtn = createElementWithClass(
        "button",
        "item-increment-btn"
      );
      incrementBtn.textContent = "+";

      appendChildren(itemQtyWrapper, [
        decrementBtn,
        itemQuantity,
        incrementBtn,
      ]);

      appendChildren(itemContainer, [
        imgContainer,
        itemTitle,
        itemPrice,
        itemQtyWrapper,
      ]);

      cartItemsContainer.appendChild(itemContainer);

      decrementBtn.addEventListener("click", () => {
        updateProductQty(id, false);
      });
      incrementBtn.addEventListener("click", () => {
        updateProductQty(id, true);
      });
    });
  }
};

/**
 * Adjusts the quantity of a product in the cart and updates the UI
 * by calling `updateCartCountUI` and `updateCartModal`.
 * Increments or decrements the product's quantity based on the `isIncrement`.
 * If decrementing leads to a quantity of zero, it removes the product from the cart.
 * @param {number} productId - The ID of the product to update.
 * @param {boolean} isIncrement - True to increment quantity, false to decrement.
 */
const updateProductQty = (productId, isIncrement) => {
  const productIndex = findProductIndexInCart(productId);

  if (productId >= 0) {
    if (isIncrement) {
      cart[productIndex].qtyInCart++;
    } else {
      if (cart[productIndex].qtyInCart > 1) {
        cart[productIndex].qtyInCart--;
      } else {
        cart.splice(productIndex, 1);
      }
    }
    updateCartCountUI();
    updateCartModal();
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

export { addToCart, updateCartQuantity, updateCartModal };
