//El index.js lo relaciono con todos los html, ya que lo destine para algunas funciones que van a ser usadas en varias ocasiones y funcionalidades que se usaran en mas de un html

//Se crean dos funciones que van a utilizarse mas de una vez, para subir datos al LocalStorage y otra para poder usarlos
//Manteniendo su forma inicial

const subiendoAlLocal = (clave, valor) => {
	localStorage.setItem(clave, JSON.stringify(valor));
};

const obtenerDelLocal = (clave) => {
	return JSON.parse(localStorage.getItem(clave));
};

//Funcion para calcular descuento a los autos con oferta

function descuento(array) {
	array.forEach((elemento) => {
		if (elemento.oferta === true) {
			let resta = elemento.precio * 0.05;
			elemento.precio -= resta;
		}
	});
}

//Aca empiezan algunas funcionalidades del carrito

let carrito = [];

//Funcion para añadir elementos al carrtio, esta en index.js porque va a ser usada en varios archivos

function aniadirCarrito(array) {
	const botonAniadir = document.querySelectorAll('.boton-card');
	botonAniadir.forEach((element) => {
		element.onclick = () => {
			const id = element.id.slice(6);
			const filtrarAutos = array.find((elemento) => {
				return elemento.id === Number(id);
			});
			carrito.push(filtrarAutos);
			subiendoAlLocal('carrito', carrito);
		};
	});
}

const productosSeleccionados = obtenerDelLocal('carrito');
carrito = productosSeleccionados || [];
