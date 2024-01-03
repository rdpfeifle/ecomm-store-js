/**
 * Create an HTML element with the specified element type and add the given class.
 * @param {string} elementType - The type of HTML element to create (e.g., 'div', 'button').
 * @param {string} className - The class to add to the created element.
 * @returns {HTMLElement} - The created HTML element with the specified class.
 */
const createElementWithClass = (elementType, className) => {
  const element = document.createElement(elementType);
  element.classList.add(className);

  return element;
};

/**
 * Append multiple child elements to a parent element.
 * @param {HTMLElement} parent - The parent element to which children will be appended.
 * @param {Array<HTMLElement>} children - An array of child elements to append to the parent.
 */
const appendChildren = (parent, children) => {
  children.forEach((child) => {
    parent.appendChild(child);
  });
};

/**
 * Creates a button element with specified attributes and optional
 * accessibility features.
 * @param {string} className - The class to add to the created button element.
 * @param {string} btnText - The text content for the button (e.g. "Add to Cart").
 * @param {string} [ariaLabel=undefined] - Optional aria-label for the button,
 * useful for screen readers and accessibility, especially for icon-only buttons
 * or buttons with non-descriptive text (e.g. "-" or "+").
 * @param {string} [type="button"] - The type of the button (e.g., "submit",
 * "reset"), with a default value of "button".
 * @param {string} [btn="button"] - The tag name for the button element to
 * be created, default is "button".
 * @returns {HTMLElement} - The created button element, optionally with an
 * aria-label attribute.
 */
const createButton = (
  className,
  btnText,
  ariaLabel = undefined,
  type = "button",
  btn = "button"
) => {
  const button = createElementWithClass(btn, className);

  button.type = type;
  button.textContent = btnText;

  if (ariaLabel) {
    button.setAttribute("aria-label", ariaLabel);
  }

  return button;
};

export { createElementWithClass, appendChildren, createButton };
