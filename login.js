//Se crean todas las variables necesarias, para interactuar con el DOM

const contenedorForm = document.querySelector('.conteinerFormulario');
const formulario = document.querySelector('#login');
const inputNombre = document.querySelector('#inputUser');
const inputPas = document.querySelector('#inputPasword');
const errorLogin = document.querySelector('#loginIncorrecto');
const cerrarSesion = document.querySelector('#botonCerrar');
const contenedorAutos = document.querySelector('.conteiner');
const listaNav = document.querySelector('nav');
const tituloAutos = document.querySelector('h2');

//Se empieza el logueo

const datosDelUsuario = {
	usuario: 'usuario',
	contrasenia: 'usuario123',
};

//Se utiliza un evento para validar los datos ingresados en los input, desencadenar una serie de acciones si son correctos y otras sino lo son
//Se sube al LocalStorage una clave valor, "login", true, si se loguea correctamente

formulario.onsubmit = (event) => {
	event.preventDefault();
	if (
		inputNombre.value === datosDelUsuario.usuario &&
		inputPas.value === datosDelUsuario.contrasenia
	) {
		subiendoAlLocal('login', true);
		contenedorForm.style.display = 'none';
		cerrarSesion.style.display = 'block';
		contenedorAutos.style.display = 'flex';
		tituloAutos.style.display = 'flex center';
		listaNav.style.display = 'flex';
		swal('Su logueo fue exitoso!!');
	} else {
		swal('Su usuario y/o contraseña son incorrectos', 'Vuelva a intentarlo');
		contenedorAutos.style.display = 'none';
		listaNav.style.display = 'none';
		formulario.reset();
	}
};

//Función para validar el logueo, y que permanezca logueado siempre y cuando la clave "login" sea true

function validarLogueo(clave) {
	if (clave !== true) {
		contenedorForm.style.display = 'flex';
		cerrarSesion.style.display = 'none';
		contenedorAutos.style.display = 'none';
		tituloAutos.style.display = 'none';
		listaNav.style.display = 'none';
	} else {
		contenedorForm.style.display = 'none';
		cerrarSesion.style.display = 'block';
		contenedorAutos.style.display = 'flex';
		listaNav.style.display = 'flex';
	}
}

validarLogueo(obtenerDelLocal('login'));

//Evento para cerrar sesión, borra la clave login del localStorage, llama nuevamente la funcion validarLogue para saber si debe mostrar el formulario de logueo o el contenedor con los autos

cerrarSesion.onclick = () => {
	localStorage.removeItem('login');
	validarLogueo(obtenerDelLocal('login'));
	formulario.reset();
	errorLogin.style.display = 'none';
};

//Funcion para crear cards

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
                    AGREGAR AL CARRITO
				</button>
			</div>
		`
		);
	}, '');
	contenedorAutos.innerHTML = generarCards;
}

//Mediante un fetch se realiza un filtrado de los autos con oferta, se le hace el descuento y se crean las cards necesarias con la funcionalidad para ser añadidas al carrito

fetch('autos.json')
	.then((respuesta) => respuesta.json())
	.then((data) => {
		const autosOferta = [...data].filter((elemento) => {
			return elemento.oferta === true;
		});
		descuento(autosOferta);

		crearCard(autosOferta);
		aniadirCarrito(autosOferta);
	});

//Funcionalidades del Carrousel de Swiper

const swiper = new Swiper('.mySwiper', {
	spaceBetween: 30,
	centeredSlides: true,
	autoplay: {
		delay: 2500,
		disableOnInteraction: false,
	},
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
});
