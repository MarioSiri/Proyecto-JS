//Realizo un console.table para visualizar el array de autos

console.table(autos);

//Función que revisa si el auto esta en oferta, si es asi le aplica un 5% de descuento, y lo muestra con un console.table

function descuento() {
	autos.forEach((elemento) => {
		if (elemento.oferta === true) {
			let resta = elemento.precio * 0.05;
			elemento.precio -= resta;
		}
	});
	console.table(autos);
}
descuento();

//Función que ordena los autos alfabeticamente por su nombre, y lo almacena en otro array autosOrdenados

const autosOrdenados = [...autos].sort((a, b) => {
	if (a.nombre < b.nombre) {
		return -1;
	} else if (a.nombre > b.nombre) {
		return 1;
	} else {
		return 0;
	}
});

//Se ejecuta un console.table para visualizar el nuevo array con los autos ordenados

console.table(autosOrdenados);

//Función que le pregunta al usuario si quiere ver los autos que estan en oferta, y muestra el resultado con un console.table

function bonificados() {
	const pregunta = confirm(
		'¿Sr Cliente desea ver la lista de Autos Bonificados?'
	);
	if (pregunta === true) {
		const autosBonificados = autos.filter((auto) => {
			return auto.oferta === true;
		});
		console.table(autosBonificados);
	}
}

bonificados();

//Función que permite al usuario buscar un auto por nombre, devolviendo un mensaje si no lo encuentra y mostrando el auto si el resultado es positivo

function buscarAutos() {
	let buscador = prompt(
		'Ingrese Nombre de Auto que desea buscar'
	).toUpperCase();

	let autoBuscado = autos.find(
		(auto) => auto.nombre.toUpperCase() === buscador
	);
	if (autoBuscado === undefined) {
		alert('El auto que ingreso no se encuentra disponible');
	} else {
		console.table(autoBuscado);
	}
}

buscarAutos();
