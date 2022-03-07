//Json
const productos = [{
    id: 1,
    nombre: "Gaseosa",
    precio: 200,
    stock: 20,
    image: "https://api.lorem.space/image/drink?w=300&h=240&hash=88g162sg"
  },
  {
    id: 2,
    nombre: "Cerveza",
    precio: 300,
    stock: 20,
    image: "https://api.lorem.space/image/drink?w=300&h=240&hash=xfgqa0ij"
  },
  {
    id: 3,
    nombre: "Mate",
    precio: 150,
    stock: 20,
    image: "https://api.lorem.space/image/drink?w=300&h=240&hash=4f521331s"
  },
  {
    id: 4,
    nombre: "Vodka",
    precio: 300,
    stock: 20,
    image: "https://api.lorem.space/image/drink?w=300&h=240&hash=vmtfoqi3"
  },
  {
    id: 5,
    nombre: "Ron",
    precio: 400,
    stock: 20,
    image: "https://api.lorem.space/image/drink?w=300&h=240&hash=e2npuf5t"
  },
  {
    id: 6,
    nombre: "Pisco",
    precio: 500,
    stock: 20,
    image: "https://api.lorem.space/image/drink?w=300&h=240&hash=85624ep"
  }
]



//Funciones
const productosDiv = document.getElementById("productos");
const btnCart = document.querySelector(".navbar-shopping-cart")
const divCart = document.querySelector(".product-detail")
const sidebar = document.querySelector(".my-order-content")
const arrow = document.querySelector(".title-container img")
const inputSearch = document.getElementById("search")

let cart = JSON.parse(localStorage.getItem("cart")) || [];

btnCart.addEventListener("click", () => {
  divCart.classList.toggle("active");
});

arrow.addEventListener("click", () => {
  divCart.classList.toggle("active")
})




const mostrarProductos = (element) => {
  element.forEach(producto => {
    productosDiv.innerHTML += `
      <div class="producto">
        <img src="${producto.image}" alt="">
        <div class="product-info">
          <div>
            <p class="nombre">${producto.nombre}</p>
            <p class="precio">$<span>${producto.precio}</span></p>
          </div>
          <figure>
            <img src="../images/icons/bt_add_to_cart.svg" class="btn-agregar" data-id="${producto.id}" alt="agregar">
          </figure>
        </div>
      </div>`
  })
  const btnAgregar = document.querySelectorAll(".btn-agregar");
  btnAgregar.forEach((e) =>
    e.addEventListener("click", (e) => {
      let cardPadre = e.target.parentElement;
      addToCart(cardPadre);
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
  
  let productoEncontrado = cart.find(
    (element) => element.id === producto.id
  );
  
  if (productoEncontrado) {
    productoEncontrado.cantidad++;
  } else {
    cart.push(producto);
  }
  console.log(cart);
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
          <p>${nombre}</p>
          <p>$<span>${precio*cantidad}</span></p>
        <img src="../images/icons/icon_close.png" class="btn-borrar" data-id="${id}" alt="close">
      </div>`
    localStorage.setItem("cart", JSON.stringify(cart))
    updateCount();
  })
}

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

const borrarProducto = (productoBorrar) => {
  cart = cart.filter((element) => element.id !== Number(productoBorrar));
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

const updateCount = () =>{
  let total = cart.reduce((acc,ite) => acc+ite.cantidad,0)
  document.querySelector(".navbar-shopping-cart div").textContent = total;
}

//Filtrar productos atravez de la busqueda
const filtrarPorNombre = () => {
  let loQueQuieroBuscar = document.getElementById("search").value;
  let filtered = productos.filter((producto) => producto.nombre.toLowerCase() === loQueQuieroBuscar.toLowerCase());

  if (filtered.length > 0) {
    productosDiv.innerHTML = "";
    mostrarProductos(filtered)
  } else {
    document.getElementById("productos").innerHTML = `<p>No se encontró el producto</p>`;
  }
  
}
search.addEventListener("change",filtrarPorNombre)

mostrarProductos(productos);
showCart();
escucharBotonesSidebar();