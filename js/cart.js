const cartQtySpan = document.querySelector(".cart-container span");

let cart = [];

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
  const existingProductIdx = cart.findIndex((item) => item.id === product.id);

  if (existingProductIdx < 0) {
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
  const productIndex = cart.findIndex((item) => item.id === productId);

  if (productIndex >= 0) {
    cart[productIndex].qtyInCart = newQuantity;

    if (newQuantity === 0) {
      cart.splice(productIndex, 1);
    }

    updateCartCountUI();
  }
};

export { updateCartCountUI, addToCart, updateCartQuantity };
