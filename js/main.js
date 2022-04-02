//Funciones
const productosDiv = document.getElementById("productos");
const btnCart = document.querySelector(".navbar-shopping-cart")
const arrow = document.querySelector(".title-container img")
const divCart = document.querySelector(".product-detail")
const sidebar = document.querySelector(".my-order-content")
const inputSearch = document.getElementById("search")


let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Cuando inicia,o el Contenido del DOM se vuelva a cargar, actualizar el contador y cantidad total
document.addEventListener('DOMContentLoaded',() => {
  updateCount();
  updateTotalCart();
})

btnCart.addEventListener("click", () => {
  divCart.classList.toggle("active");
});

arrow.addEventListener("click", () => {
  divCart.classList.toggle("active")
})

// Obtener todos los productos mediante un fetch a la url de la API
function getData() {
  let url = 'https://shop-api-production.up.railway.app/products'
  fetch(url)
    .then((response) => response.json())
    .then((data) => data.forEach(element => mostrarProductos(element)))
    .catch(error => console.log(error))
}

function mostrarProductos(product) {
  productosDiv.innerHTML += /* html */ `
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
  
  localStorage.setItem("cart", JSON.stringify(cart))
  updateCount();
  updateTotalCart()
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
        <span class="btn-restar" data-id="${id}">&#45</span>
        <span class="btn-borrar" data-id="${id}">&times</span>
      </div>`
  })
}

//Restar producto al hacer click
const restarProducto = (idProductoRestar) => {
  let productoEncontrado = cart.find(
    (element) => element.id === Number(idProductoRestar)
  );
  if (productoEncontrado) {
    productoEncontrado.cantidad--;
    if(productoEncontrado.cantidad < 1){
      borrarProducto(idProductoRestar)
    }
  }
  localStorage.setItem("cart", JSON.stringify(cart))
  updateCount()
  updateTotalCart()
  showCart();
};

//Borrar producto al hacer  click
 const borrarProducto = (idProductoBorrar) => {
   cart = cart.filter(element => element.id !== Number(idProductoBorrar));

   localStorage.setItem("cart", JSON.stringify(cart))
   updateCount()
   updateTotalCart()
   showCart();
 };

// Oir eventos para los botones restar(-) y eliminar(x)
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

/* Actualizar contador carrito */
const updateCount = () => {
  let cart = JSON.parse(localStorage.getItem("cart")); 
  let total = cart.reduce((acc, ite) => acc + ite.cantidad, 0);
  document.querySelector(".navbar-shopping-cart div").textContent = total;
}
/* Sumatoria de precios del total del carrito */
const updateTotalCart = () => {
  let cart = JSON.parse(localStorage.getItem("cart"));
  let total = cart.reduce((acc, ite) => acc + (ite.precio*ite.cantidad), 0)
  document.querySelector(".order").innerHTML = `
    <p>
      <span>Total</span> 
    </p>
    <p>$${total}</p>
    `;
}

/* Input de busqueda */
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


// Obtener Categorias 
function getCategories() {
  let url = 'https://shop-api-production.up.railway.app/categories'
  fetch(url)
    .then((response) => response.json())
    .then((data) => data.forEach(element => showCategories(element)))
    .catch(error => console.log(error))
}

// Conseguir La lista donde se va a mostrar las categorias
let categoriesList = document.querySelector(".navbar-left ul")
// Mostrar categorias
const showCategories = (element) => {
  categoriesList.innerHTML += /* html */`
    <li>
      <a data-id="${element.id}">${element.name}</a>
    </li>
    `
  const btnCategory = document.querySelectorAll("a")
    btnCategory.forEach((e) =>
      e.addEventListener("click", (e) => {
        let categoryId = (e.target.getAttribute("data-id"))
        orderByCategories(categoryId)
      })
    )
}

// Cuando el usuario clickea en cada categoria, limpias el contenedor y mostrar por categoria elegida
function orderByCategories(id) {
  productosDiv.innerHTML = ``;
  fetch(`https://shop-api-production.up.railway.app/order_by_category?category_id=${id}`)
    .then((response) => response.json())
    .then((data) => data.forEach(element => mostrarProductos(element)))
    .catch(error => console.log(error))
}
// Conseguir el boton para categoria Todo
let todo = document.querySelector('#todo')
// Cuando el usuario clickea en el boton Todo, ejecturar la funcion getData
todo.addEventListener('click', getData )


getData();
showCart();
escucharBotonesSidebar();
getCategories()