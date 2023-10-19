const productosEnCarrito = JSON.parse(
    localStorage.getItem("carrito-contenedor")
);

const mostrarCarrito = document.getElementById("mostrar-carrito");

function actualizarCarrito() {
    mostrarCarrito.innerHTML = "";
    if (productosEnCarrito && productosEnCarrito.length > 0) {
        const ul = document.createElement("ul");
        productosEnCarrito.forEach((p, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
        <br></br>
        <p class="texto-carrito"><strong>Producto:</strong> ${p.articulo}</p>
        <img class="img-carrito" src= "${p.imagen}" alt="${p.articulo}"/>
        <p class="texto-carrito"><strong>Precio: US$</strong> ${p.precio}</p>
        <button producto-index="${index}" class="borrar-producto">Eliminar</button>
        `;
            ul.appendChild(li);
        });
        mostrarCarrito.appendChild(ul);
    } else {
        mostrarCarrito.className = "texto-carrito";
        mostrarCarrito.innerText =
            "Aún no has agregado ningún articulo a tu carrito";
    }

    const total = productosEnCarrito.reduce((acc, p) => acc + p.precio, 0);
    const total1 = document.createElement("div");
    total1.innerHTML = `<p class="texto-carrito"> Total a pagar: US$${total}</p>`;
    mostrarCarrito.appendChild(total1);
}

function eliminarProducto(index) {
    productosEnCarrito.splice(index, 1);
    localStorage.setItem(
        "carrito-contenedor",
        JSON.stringify(productosEnCarrito)
    );
    actualizarCarrito();
}

mostrarCarrito.addEventListener("click", function(e) {
    if (e.target.classList.contains("borrar-producto")) {
        const index = parseInt(e.target.getAttribute("producto-index"));
        eliminarProducto(index);
    }
});

actualizarCarrito();

///////////////////////////////////////////////////////////////////////////////

const finalizarCompra = document.getElementById("finalizar-compra");
const botonFinalizar = document.createElement("button");
botonFinalizar.textContent = "Finalizar compra";
botonFinalizar.style.display = "none";
botonFinalizar.className = "boton-finalizar";
productosEnCarrito.length > 0 ?
    (botonFinalizar.style.display = "block") :
    (botonFinalizar.style.display = "none");

function cerrarCompra() {
    Swal.fire({
        title: "¿Deseas finalizar tu compra?",
        showDenyButton: true,

        confirmButtonText: "Finalizar",
        denyButtonText: `Seguir comprando`,
    }).then((result) => {
        result.isConfirmed ?
            Swal.fire(
                "Compra confirmada",
                "",
                "success",
                setTimeout(() => {
                    Swal.fire({
                        title: "<strong>Información importante</strong>",
                        icon: "info",
                        html: "<b>Si deseas abonar tu producto en pesos, puedes encontrar en el menú principal la cotización del dolar oficial en el dia de hoy</b>",
                        showCloseButton: true,
                        showCancelButton: true,
                        focusConfirm: false,
                        confirmButtonText: '<i class="fa fa-thumbs-up"></i> Deseo abonar en pesos',
                        confirmButtonAriaLabel: "Thumbs up, great!",
                        cancelButtonText: '<i class="fa fa-thumbs-up">Deseo abonar en dólares</i>',
                        cancelButtonAriaLabel: "Thumbs down",
                    });
                }, 3000)
            ) :
            Swal.fire("Continuar editando carrito", "", "info");
    });
    localStorage.setItem(
        "carrito-contenedor",
        JSON.stringify(productosEnCarrito)
    );
    actualizarCarrito();
}

finalizarCompra.appendChild(botonFinalizar);
botonFinalizar.addEventListener("click", cerrarCompra);
actualizarCarrito();