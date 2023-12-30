const productsCategory = document.getElementById("categories-filter");
const productsContainerEl = document.getElementById("products-container");

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

export const filterCategories = () => {
  // display categories "All", "Women's Clothing" and "Jewelry"
  // filter the products
};

export const showProducts = async () => {
  const products = await fetchProducts();

  // extract id, title, price, category, and image
  const productsHTML = products
    .map((product) => {
      const { id, image, title, price } = product;

      const category =
        product.category === "jewelery" ? "jewelry" : product.category;

      return `
    <div data-id="${id}" class="product-container">
        <div class="img-container">
          <img src="${image}" alt="${title}" class="product-image" />
        </div>
        <h3 class="product-title">${title}</h3>
        <p class="product-category">${category}</p>
        <p class="product-price">$${price}</p>
        <button class="add-to-cart">Add to Cart</button>
    </div>
  `;
    })
    .join("");

  productsContainerEl.innerHTML = productsHTML;
};
