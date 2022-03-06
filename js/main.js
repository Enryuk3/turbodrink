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

let carrito = [];
//Funciones
const productosDiv = document.getElementById("productos"); 

const mostrarProductos = (element) => {
  element.forEach(producto => {
    productosDiv.innerHTML += `
      <div id="${producto.id}" class="producto">
        <img src="${producto.image}" alt="">
        <div class="product-info">
          <div>
            <p class="nombre">${producto.nombre}</p>
            <p class="precio">${producto.precio}</p>
          </div>
          <figure>
            <img src="../images/icons/bt_add_to_cart.svg"  onclick="addToCart(${producto.id})" alt"">
          </figure>
        </div>
      </div>`;
  })
}
  
//Filtrar productos atravez de la busqueda
const filtrarPorNombre = () => {
  let loQueQuieroBuscar = document.getElementById("search").value;
  let filtered = productos.filter(producto => {
    producto.nombre.toLowerCase() === loQueQuieroBuscar.toLowerCase()
  });

  if (filtered.length > 0) {
    productosDiv.innerHTML = "";
    mostrarProductos(filtered)
  } else {
    document.getElementById("productos").innerHTML = `<p>No se encontró el producto</p>`;
  }
}

//Agregar productos al carrito luego mostrar por consola
const addToCart = (id) => {
  let producto = productos.find(producto => producto.id === id);
  producto.cantidad = 1
  if (carrito.includes(producto)) {
    producto.cantidad += 1;
    producto.subtotal = producto.precio * producto.cantidad;

  } else {
    carrito.push(producto);
  }
  /* console.log(producto.cantidad)
  console.log(producto.subtotal) */
  alert("Producto agregado al carrito revisa la consola");
  console.log(carrito);
}

mostrarProductos(productos);

//Agregando local storage

/* localStorage.setItem */