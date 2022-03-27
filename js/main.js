//Funciones
const productosDiv = document.getElementById("productos");
const btnCart = document.querySelector(".navbar-shopping-cart")
const divCart = document.querySelector(".product-detail")
const sidebar = document.querySelector(".my-order-content")
const arrow = document.querySelector(".title-container img")
const inputSearch = document.getElementById("search")
const totalCart = document.querySelector(".total-cart")

let cart = JSON.parse(localStorage.getItem("cart")) || [];

btnCart.addEventListener("click", () => {
  divCart.classList.toggle("active");
});

arrow.addEventListener("click", () => {
  divCart.classList.toggle("active")
})

function getData() {
  let url = 'https://shop-api-production.up.railway.app/products'
  fetch(url)
    .then((response) => response.json())
    .then((data) => data.forEach(element => mostrarProductos(element)))
    .catch(error => console.log(error))
}

function mostrarProductos(product) {
  productosDiv.innerHTML += `
      <div class="producto">
        <div class="producto-img">
          <img src="${product.url_image || "https://t3.ftcdn.net/jpg/04/34/72/82/360_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg"}" alt="${product.name}">
        </div>
        <div class="product-info">
          <div>
            <p class="nombre">${product.name}</p>
            <p class="precio">$<span>${product.price}</span></p>
          </div>
          <figure>
            <img src="./images/icons/bt_add_to_cart.svg" class="btn-agregar" data-id="${product.id}" alt="agregar">
          </figure>
        </div>
      </div>`

  const btnAgregar = document.querySelectorAll(".btn-agregar");
  btnAgregar.forEach((e) =>
    e.addEventListener("click", (e) => {
      let cardPadre = e.target.parentElement;
      addToCart(cardPadre);
      iziToast.success({
        id:'success',
        title: 'OK',
        message: 'Producto agregado al carrito'
      });
    })
  )
}

//Agregar productos
const addToCart = (cardPadre) => {
  let producto = {
    nombre: cardPadre.parentElement.querySelector(".nombre").textContent,
    precio: Number(cardPadre.parentElement.querySelector(".precio span").textContent),
    cantidad: 1,
    image: cardPadre.parentElement.parentElement.querySelector("img").src,
    id: Number(cardPadre.querySelector("img").getAttribute("data-id")),
  };

  let productoEncontrado = cart.find((e) => e.id === producto.id);

  if (productoEncontrado) {
    productoEncontrado.cantidad++;
  } else {
    cart.push(producto);
  }
  // console.log(cart);
  showCart();
}


const showCart = () => {
  sidebar.innerHTML = "";
  cart.forEach((element) => {
    let {nombre, precio, image, cantidad, id} = element;
    sidebar.innerHTML += /* html */`
      <div class="shopping-cart">
        <figure>
          <img src="${image}" alt="${nombre}">
        </figure>
        <div>
          <p>${nombre}</p>
          <p>Cantidad: ${cantidad}</p>
        </div>
        <p>$<span>${precio*cantidad}</span></p>
        <button class="btn-restar" data-id="${id}">-</button>
        <button class="btn-borrar" data-id="${id}">x</button>
      </div>`
    localStorage.setItem("cart", JSON.stringify(cart))
    updateCount();
    updateTotalCart();
  })
}

//Restar producto al hacer click
const restarProducto = (productoRestar) => {
  let productoEncontrado = cart.find(
    (element) => element.id === Number(productoRestar)
  );
  if (productoEncontrado) {
    productoEncontrado.cantidad--;
    if (productoEncontrado.cantidad === 0) {
      productoEncontrado.cantidad = 1;
    }
  }
  showCart();
};

//Borrar producto al hacer  click
const borrarProducto = (productoBorrar) => {
  cart = cart.filter(element => element.id !== Number(productoBorrar));
  showCart();
};

const escucharBotonesSidebar = () => {
  sidebar.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-restar")) {
      restarProducto(e.target.getAttribute("data-id"));
    }
    if (e.target.classList.contains("btn-borrar")) {
      borrarProducto(e.target.getAttribute("data-id"));
    }
  });
};

const updateCount = () => {
  let total = cart.reduce((acc, ite) => acc + ite.cantidad, 0)
  document.querySelector(".navbar-shopping-cart div").textContent = total;
}
/* Sumatoria de precios del total del carrito */
const updateTotalCart = () => {
  let total = cart.reduce((acc, ite) => acc + ite.precio, 0)
  console.log(total)
  
  document.querySelector(".total-cart").textContent = total;
}

function searchInput(name) {
  fetch(`https://shop-api-production.up.railway.app/search?name=${name}`)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("productos").textContent = '';
      data.forEach(element => mostrarProductos(element))
    })
}

inputSearch.addEventListener('input', (e) => {
  let name = e.target.value;
  searchInput(name)
})

function getCategories() {
  let url = 'https://shop-api-production.up.railway.app/categories'
  fetch(url)
    .then((response) => response.json())
    .then((data) => data.forEach(element => showByCategories(element)))
    .catch(error => console.log(error))
}

//renderizando categorias
let categoriesDiv = document.querySelector(".sidebar-body")

function showByCategories(element) {
  categoriesDiv.innerHTML += /* html */`
  <a class="btn" data-id="${element.id}">
  <div><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="24"
      width="24" xmlns="http://www.w3.org/2000/svg">
      <path fill="none" d="M0 0h24v24H0z"></path>
      <path
        d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z">
      </path>
    </svg><span>${element.name}</span>
  </div>
  </a>
  <button></button>
  `
  const btnCategories = document.querySelectorAll(".btn")
  btnCategories.forEach((e) =>
    e.addEventListener("click", (e) => {
      let categoryId = (e.target.getAttribute("data-id"))
      orderByCategories(categoryId)
    })
  )
}


//filtrar por categorias
function orderByCategories(id) {
  productosDiv.innerHTML = ``;
  fetch(`https://shop-api-production.up.railway.app/order_by_category?category_id=${id}`)
    .then((response) => response.json())
    .then((data) => data.forEach(element => mostrarProductos(element)))
    .catch(error => console.log(error))
}


getData();
showCart();
escucharBotonesSidebar();
getCategories()