import { showProducts } from "./products.js";

async function loadProductsContainer() {
  const response = await fetch("../views/products.html");
  const content = await response.text();
  document.getElementById("products-container").innerHTML = content;
}

showProducts();

loadProductsContainer();
