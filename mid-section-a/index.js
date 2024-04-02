const products = [
  {
    name: "Scooter",
    price: 199.99,
    imageUrl: "https://api.dicebear.com/8.x/icons/svg?seed=Scooter",
  },
  {
    name: "Headphones",
    price: 99.99,
    imageUrl: "https://api.dicebear.com/8.x/icons/svg?seed=Headphones",
  },
  {
    name: "Smartphone",
    price: 599.99,
    imageUrl: "https://api.dicebear.com/8.x/icons/svg?seed=Smartphone",
  },
  {
    name: "Laptop",
    price: 999.99,
    imageUrl: "https://api.dicebear.com/8.x/icons/svg?seed=Laptop",
  },
  {
    name: "Watch",
    price: 149.99,
    imageUrl: "https://api.dicebear.com/8.x/icons/svg?seed=Watch",
  },
  {
    name: "Sunglasses",
    price: 49.99,
    imageUrl: "https://api.dicebear.com/8.x/icons/svg?seed=Sunglasses",
  },
  {
    name: "Backpack",
    price: 79.99,
    imageUrl: "https://api.dicebear.com/8.x/icons/svg?seed=Backpack",
  },
  {
    name: "Gaming Console",
    price: 399.99,
    imageUrl: "https://api.dicebear.com/8.x/icons/svg?seed=Gaming%20Console",
  },
];

const container = document.getElementById("product-container");
const cartElement = document.getElementById("cart");
const cart = [];

// Function to add product to cart
function addToCart(product) {
  // Check if the product is already in the cart
  const existingItem = cart.find(item => item.name === product.name);
  if (existingItem) {
    // If yes, increase the quantity
    existingItem.quantity++;
  } else {
    // If not, add the product with quantity 1
    cart.push({ ...product, quantity: 1 });
  }
  renderCart();
}

// Function to remove product from cart
function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}

// Function to update quantity in cart
function updateQuantity(index, newQuantity) {
  cart[index].quantity = newQuantity;
  renderCart();
}

// Function to render cart
function renderCart() {
  cartElement.innerHTML = "";
  let totalPrice = 0;

  cart.forEach((product, index) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    const itemImage = document.createElement("img");
    itemImage.src = product.imageUrl;
    itemImage.alt = product.name;
    itemImage.classList.add("product-image");

    const itemName = document.createElement("span");
    itemName.textContent = product.name;

    const itemPrice = document.createElement("span");
    itemPrice.textContent = $${(product.price * product.quantity).toFixed(2)};

    const quantityContainer = document.createElement("div");
    quantityContainer.classList.add("quantity-container");

    const decreaseButton = document.createElement("button");
    decreaseButton.textContent = "-";
    decreaseButton.classList.add("quantity-button");
    decreaseButton.addEventListener("click", () => {
      if (product.quantity > 1) {
        updateQuantity(index, product.quantity - 1);
      }
    });

    const quantityInput = document.createElement("input");
    quantityInput.type = "text";
    quantityInput.value = product.quantity;
    quantityInput.classList.add("quantity-input");

    const increaseButton = document.createElement("button");
    increaseButton.textContent = "+";
    increaseButton.classList.add("quantity-button");
    increaseButton.addEventListener("click", () => {
      updateQuantity(index, product.quantity + 1);
    });

    quantityContainer.appendChild(decreaseButton);
    quantityContainer.appendChild(quantityInput);
    quantityContainer.appendChild(increaseButton);

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("remove-from-cart-btn");
    removeButton.addEventListener("click", () => {
      removeFromCart(index);
    });

    cartItem.appendChild(itemImage);
    cartItem.appendChild(itemName);
    cartItem.appendChild(itemPrice);
    cartItem.appendChild(quantityContainer);
    cartItem.appendChild(removeButton);
    cartElement.appendChild(cartItem);

    totalPrice += product.price * product.quantity;
  });

  const totalPriceElement = document.createElement("div");
  totalPriceElement.textContent = "Total Price: $" + totalPrice.toFixed(2);
  cartElement.appendChild(totalPriceElement);
}

// Render products
products.forEach((product) => {
  const productDiv = document.createElement("div");
  productDiv.classList.add("product");

  const imageContainer = document.createElement("div");
  imageContainer.classList.add("image-container");

  const image = document.createElement("img");
  image.src = product.imageUrl;
  image.alt = product.name;
  image.classList.add("product-image");

  imageContainer.appendChild(image);

  const infoDiv = document.createElement("div");
  infoDiv.classList.add("info");

  const name = document.createElement("h2");
  name.textContent = product.name;

  const price = document.createElement("p");
  price.textContent = "$" + product.price.toFixed(2);

  const button = document.createElement("button");
  button.textContent = "Add to Cart";
  button.classList.add("add-to-cart-btn");
  button.addEventListener("click", () => {
    addToCart(product);
  });

  infoDiv.appendChild(name);
  infoDiv.appendChild(price);
  infoDiv.appendChild(button);

  productDiv.appendChild(imageContainer);
  productDiv.appendChild(infoDiv);

  container.appendChild(productDiv);
});
