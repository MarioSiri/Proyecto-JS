//Se crean todas las variables necesarias, para interactuar con el DOM

const cambioModo = document.querySelector("#claro-oscuro")
const body = document.querySelector(".modo-claro")
const contenedorForm = document.querySelector(".conteinerFormulario")
const formulario = document.querySelector("#login")
const inputNombre = document.querySelector("#inputUser")
const inputPas = document.querySelector("#inputPasword")
const errorLogin = document.querySelector("#loginIncorrecto")
const cerrarSesion = document.querySelector("#botonCerrar")
const contenedorAutos = document.querySelector('.conteiner')

//Se realiza evento para cambiar de modo claro a modo oscuro, incluyendo fondo de body, header, footer y las card
//Ademas se cambia el color de texto de header, footer y formulario

cambioModo.onclick = () => {
	body.classList.toggle("modo-oscuro")
	if ( body.className === "modo-claro modo-oscuro") {
		cambioModo.textContent = "Modo Claro"
	} else {
		cambioModo.textContent = "Modo Oscuro"
	}
}


//Se empieza el logueo

const datosDelUsuario = {
	usuario: "usuario",
	contrasenia: "usuario123"
}

//Se crean dos funciones que van a utilizarse mas de una vez, para subir datos al LocalStorage y otra para poder usarlos
//Manteniendo su forma inicial

const subiendoAlLocal = ( clave, valor) => {
	localStorage.setItem( clave, JSON.stringify(valor))
}

const obtenerDelLocal = ( clave ) => {
	return JSON.parse(localStorage.getItem( clave ))
}

//Se utiliza un evento para validar los datos ingresados en los input, desencadenar una serie de acciones si son correctos y otras sino lo son
//Se sube al LocalStorage una clave valor, "login", true, si se loguea correctamente

formulario.onsubmit = (event) => {
	event.preventDefault()
	if ( inputNombre.value === datosDelUsuario.usuario && inputPas.value === datosDelUsuario.contrasenia ) {
		subiendoAlLocal("login", true)
		contenedorForm.style.display = "none"
		cerrarSesion.style.display = "block"
		contenedorAutos.style.display = "flex"
	} else {
		errorLogin.style.display = "block"
		contenedorAutos.style.display = "none"
		formulario.reset()
	}
}

//Función para validar el logueo, y que permanezca logueado siempre y cuando la clave "login" sea true

function validarLogueo ( clave ) {
	if (clave !== true) {
		contenedorForm.style.display = "flex"
		cerrarSesion.style.display = "none"
		contenedorAutos.style.display = "none"
	} else {
		contenedorForm.style.display = "none"
		cerrarSesion.style.display = "block"
		contenedorAutos.style.display = "flex"
	}
}

validarLogueo(obtenerDelLocal("login"))


//Evento para cerrar sesión, borra la clave login del localStorage, llama nuevamente la funcion validarLogue para saber si debe mostrar el formulario de logueo o el contenedor con los autos

cerrarSesion.onclick = () => {
    localStorage.removeItem( "login" )
    validarLogueo(obtenerDelLocal("login"))
    formulario.reset()
	errorLogin.style.display = "none"
}


//Se crea función para crear cards con todos los productos del array

function crearCard(array) {

	array.forEach((elemento) => {
		const card = document.createElement('div');
		card.className = 'card';
		card.innerHTML = `
			<div class "conteiner-img>
				<img src = ${elemento.img} alt = ${elemento.descripcion}>
			</div>
			<h4>
				${elemento.nombre}
			</h4>
			<p>
				Precio USD ${elemento.precio}
			</p>
			<p>
				Año: ${elemento.anio}
			</p>
		`;
		contenedorAutos.appendChild(card);
	});
}

crearCard ( autos )




////////////////////

//Desde aca para abajo, es codigo de la segunda pre-entrega, que se utilizara mas adelante para el proyecto final, por eso lo dejo aqui



//Realizo un console.table para visualizar el array de autos

//console.table(autos);

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
//descuento();

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

//console.table(autosOrdenados);

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

//bonificados();

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

//buscarAutos();


