//CONSTRUCTOR DE OBJETOS

function Producto(articulo, precio, stock, id, categoria, imagen) {
    this.articulo = articulo;
    this.precio = precio;
    this.stock = stock;
    this.id = id;
    this.categoria = categoria;
    this.imagen = imagen;
}

// CREANDO OBJETOS

//MATES
const mate1 = new Producto(
    "mate yoda",
    20,
    20,
    1,
    "mates",
    "/img/mate-yoda.jpg"
);
const mate2 = new Producto(
    "mate groot",
    30,
    5,
    2,
    "mates",
    "/img/mate-groot.jpg"
);
const mate3 = new Producto(
    "mate stich",
    22,
    15,
    3,
    "mates",
    "/img/mate-stitch.jpeg"
);

// LLAVEROS
const llavero1 = new Producto(
    "llavero yoda",
    15,
    50,
    4,
    "llaveros",
    "/img/llavero-yoda.png"
);
const llavero2 = new Producto(
    "llavero naruto",
    15,
    30,
    5,
    "llaveros",
    "/img/llavero-naruto.jpg"
);
const llavero3 = new Producto(
    "llavero chala",
    15,
    10,
    6,
    "llaveros",
    "/img/llavero-chala.jpg"
);

// FIGURAS
const figura1 = new Producto(
    "figura de naruto",
    50,
    10,
    7,
    "figuras",
    "/img/figura-naruto.jpg"
);
const figura2 = new Producto(
    "figura de sasuke",
    50,
    5,
    8,
    "figuras",
    "/img/figura-susuke.jpg"
);
const figura3 = new Producto(
    "figura de kurama",
    55,
    8,
    9,
    "figuras",
    "/img/figura-kurama.jpg"
);

/////////////////////////////////////////////////////////////////////////
//ARRAY DE PRODUCTOS

const productos = [
    mate1,
    mate2,
    mate3,
    llavero1,
    llavero2,
    llavero3,
    figura1,
    figura2,
    figura3,
];

//////Contenedor Productos///////

const contenedorProductos = document.getElementById("contenedor-productos");

productos.forEach((producto) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <br>
    <div class="card" style="width: 18rem">
      <img src="${producto.imagen}" class="card-img-top" alt="" />
      <div class="card-body">
      <h2>${producto.categoria}</h2>
        <h3 class="card-title">${producto.articulo}</h3>
<h4>U$$${producto.precio}</h4>
        <button class="btn btn-primary" id="${producto.id}">Agregar</button>
      </div></div>`;

    contenedorProductos.appendChild(div);
});
////////////carrito//////////////

let carrito = [];

function agregarAlCarrito(e) {
    const boton = e.target;
    const idBoton = parseInt(boton.getAttribute("id"));
    const productoElegido = productos.find((p) => p.id === idBoton);
    if (productoElegido && productoElegido.stock > 0) {
        const productoEnCarrito = {
            articulo: productoElegido.articulo,
            precio: productoElegido.precio,
            stock: productoElegido.stock,
            id: productoElegido.id,
            imagen: productoElegido.imagen,
        };
        carrito.push(productoEnCarrito);
        Swal.fire(productoElegido.articulo + " se ha añadido a tu carrito");
        productoElegido.stock--;
        localStorage.setItem("carrito-contenedor", JSON.stringify(carrito));
    } else {
        Swal.fire("Producto no encontrado");
    }
}

////////////botones//////////////

const botonesAgregar = document.querySelectorAll(".btn-primary");
botonesAgregar.forEach((botonAgregar) => {
    botonAgregar.addEventListener("click", agregarAlCarrito);
});