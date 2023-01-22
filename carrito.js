//Se crean todas las variables necesarias, para interactuar con el DOM

let infoDeLocal = obtenerDelLocal('carrito');
const contenedorCarrito = document.querySelector('.conteiner-carrito');
const vaciarElCarrito = document.querySelector('#vaciarCarrito');
const terminarCompra = document.querySelector('#terminarCompra');

//Funcion para crear las cards del carrito

function crearCard(array) {
	const generarCards = array.reduce((acc, elemento) => {
		return (
			acc +
			`
			<div class="card" id="auto-${elemento.id}">
				<div class ="conteiner-img">
					<img src = ${elemento.img} alt = ${elemento.descripcion}>
				</div>
				<p>
					${elemento.nombre}
				</p>
				<p>
					Precio USD ${elemento.precio}
				</p>
				<p>
					Año: ${elemento.anio}
				</p>
				<button id="boton-${elemento.id}" class="boton-card">
                    ELIMINAR DEL CARRITO
				</button>
			</div>
		`
		);
	}, " ");
	contenedorCarrito.innerHTML = generarCards;
}

crearCard(infoDeLocal || []);

//Funcion para borrar elementos del carrito desde el boton de la card

function borrarDelCarrito(array) {
	const botonAniadir = document.querySelectorAll('.boton-card');
	botonAniadir.forEach((element) => {
		element.onclick = () => {
			const id = element.id.slice(6);
			const filtrarAutos = array.filter((elemento) => {
				return elemento.id != Number(id);
			});
			infoDeLocal = filtrarAutos;
			subiendoAlLocal('carrito', infoDeLocal);
			crearCard(infoDeLocal);
			borrarDelCarrito(infoDeLocal);
		};
	});
}

borrarDelCarrito(infoDeLocal);

//Evento que vacia el total del carrtio apretando un boton y envia una SweetAlert

vaciarElCarrito.onclick = () => {
	localStorage.removeItem('carrito');
	swal('CARRITO VACIO');
	contenedorCarrito.innerHTML = 'NO HAY PRODUCTOS EN EL CARRITO';
};

//Evento que vacia el total del carrtio apretando un boton y envia una SweetAlert al finalizar la compra

terminarCompra.onclick = () => {
	localStorage.removeItem('carrito');
	swal('COMPRA FINALIZADA CORRECTAMENTE');
	contenedorCarrito.innerHTML = 'NO HAY PRODUCTOS EN EL CARRITO';
};
