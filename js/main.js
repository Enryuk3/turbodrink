//Variables globales
let id = 0;
let nombre = "";
let precio = 0;
let stock = 0;
let carrito = [];

class Producto {
  constructor(id, nombre, precio, stock, image) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
    this.image = image;
    this.cantidad = 1; //Cantidad por defecto
    this. subtotal = this.precio; //Subtotal por defecto
  }
}
//objetos
const gaseosa = new Producto(1, "Gaseosa", 200, 20, "https://api.lorem.space/image/drink?w=300&h=240&hash=88g162sg")
const cerveza = new Producto(2, "Cerveza", 300, 20, "https://api.lorem.space/image/drink?w=300&h=240&hash=xfgqa0ij")
const mate = new Producto(3, "Mate", 150, 20, "https://api.lorem.space/image/drink?w=300&h=240&hash=4f521331s")
const vodka = new Producto(4, "Vodka", 300, 20, "https://api.lorem.space/image/drink?w=300&h=240&hash=vmtfoqi3")
const ron = new Producto(5, "Ron", 400, 20, "https://api.lorem.space/image/drink?w=300&h=240&hash=e2npuf5t")
const pisco = new Producto(6, "Pisco", 500, 20, "https://api.lorem.space/image/drink?w=300&h=240&hash=85624ep")

//arreglo
const productos = [gaseosa, cerveza, mate, vodka, ron, pisco]


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
  let filtered = productos.filter(producto => producto.nombre.toLowerCase() === loQueQuieroBuscar.toLowerCase());

  if (filtered.length > 0) {
    productosDiv.innerHTML = "";
    mostrarProductos(filtered)
  }else {
    document.getElementById("productos").innerHTML = `<p>No se encontró el producto</p>`;
  }
}

//Agregar productos al carrito luego mostrar por consola
const addToCart = (id) => {
  let producto = productos.find(producto => producto.id === id);

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