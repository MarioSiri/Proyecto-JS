//Se crean todas las variables necesarias, para interactuar con el DOM

const contenedorProductos = document.querySelector('.conteiner-productos');
const contenedorOrdenados = document.querySelector('.conteiner-autosaz');
const contenedorDescendentes = document.querySelector('.conteiner-autosza');
const contenedorOfertas = document.querySelector('.conteiner-ofertas');
const botonOrdenar = document.querySelector('#botonOrdenar');

//Funcion para crear cards de autos totales, luego sera ejecutada desde un fetch

function crearProductos(array) {
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
	contenedorProductos.innerHTML = generarCards;
}

//Funcion para crear cards de autos ordenados de a-z, luego sera ejecutada desde un fetch

function crearAutosOrdenados(array) {
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
	contenedorOrdenados.innerHTML = generarCards;
}

//Funcion para crear cards de autos ordenados de z-a, luego sera ejecutada desde un fetch

function crearAutosDescendentes(array) {
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
	contenedorDescendentes.innerHTML = generarCards;
}

//Funcion para crear cards de autos en oferta, luego sera ejecutada desde un fetch

function crearAutosOfertas(array) {
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
	contenedorOfertas.innerHTML = generarCards;
}

//Mediante un fetch y llamando las funciones necesarias se crean todas las cards de los autos disponibles en el json

fetch('autos.json')
	.then((respuesta) => respuesta.json())
	.then((data) => {
		crearProductos(data);
		aniadirCarrito(data);
	});

//Mediante un boton se despliega una sweetAlert que permite la opcion de ordenar de a-z, de z-a o mostrar las ofertas

botonOrdenar.onclick = () => {
	swal({
		title: 'ELIGE UNA OPCIÓN',
		buttons: {
			a: 'ORDENAR DE A-Z',
			b: 'ORDENAR DE Z-A',
			c: 'MOSTRAR OFERTAS',
		},
	}).then((valor) => {
		if (valor === 'a') {
			contenedorProductos.style.display = 'none';
			contenedorDescendentes.style.display = 'none';
			contenedorOfertas.style.display = 'none';
			contenedorOrdenados.style.display = 'flex';
			fetch('autos.json')
				.then((respuesta) => respuesta.json())
				.then((data) => {
					const autosOrdenados = [...data].sort((a, b) => {
						if (a.nombre < b.nombre) {
							return -1;
						} else if (a.nombre > b.nombre) {
							return 1;
						} else {
							return 0;
						}
					});
					crearAutosOrdenados(autosOrdenados);
					aniadirCarrito(autosOrdenados);
				});
		} else if (valor === 'b') {
			contenedorProductos.style.display = 'none';
			contenedorOrdenados.style.display = 'none';
			contenedorOfertas.style.display = 'none';
			contenedorDescendentes.style.display = 'flex';
			fetch('autos.json')
				.then((respuesta) => respuesta.json())
				.then((data) => {
					const autosDescendentes = [...data].sort((a, b) => {
						if (a.nombre < b.nombre) {
							return 1;
						} else if (a.nombre > b.nombre) {
							return -1;
						} else {
							return 0;
						}
					});
					crearAutosDescendentes(autosDescendentes);
					aniadirCarrito(autosDescendentes);
				});
		} else if (valor === 'c') {
			contenedorProductos.style.display = 'none';
			contenedorDescendentes.style.display = 'none';
			contenedorOrdenados.style.display = 'none';
			contenedorOfertas.style.display = 'flex';
			fetch('autos.json')
				.then((respuesta) => respuesta.json())
				.then((data) => {
					const autosConOferta = [...data].filter((elemento) => {
						return elemento.oferta === true;
					});
					descuento(autosConOferta);

					crearAutosOfertas(autosConOferta);
					aniadirCarrito(autosConOferta);
				});
		} else {
			contenedorProductos.style.display = 'flex';
			contenedorOrdenados.style.display = 'none';
			contenedorDescendentes.style.display = 'none';
			contenedorOfertas.style.display = 'none';
		}
	});
};
