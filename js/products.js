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
    .map(
      (product) => `
    <div data-id="${product.id}" class="product-container">
        <img src="${product.image}" alt="${product.title}" class="product-image" />
        <h3 class="product-title">${product.title}</h3>
        <p class="product-category">${product.category}</p>
        <p class="product-price">$${product.price}</p>
    </div>
  `
    )
    .join("");

  productsContainerEl.innerHTML = productsHTML;
};
