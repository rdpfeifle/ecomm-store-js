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

export { createElementWithClass, appendChildren };
