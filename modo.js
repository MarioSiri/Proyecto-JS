const cambioModo = document.querySelector('#claro-oscuro');
const body = document.querySelector('.modo-claro');

//Se realiza evento para cambiar de modo claro a modo oscuro, incluyendo fondo de body, header, footer y las card
//Ademas se cambia el color de texto de header, footer y formulario

cambioModo.onclick = () => {
	body.classList.toggle('modo-oscuro');
	if (body.className === 'modo-claro modo-oscuro') {
		cambioModo.textContent = 'Modo Claro';
		subiendoAlLocal('Oscuro', true);
	} else {
		cambioModo.textContent = 'Modo Oscuro';
		localStorage.removeItem('Oscuro');
		validarModo(obtenerDelLocal('Oscuro'));
	}
};

//Funcion para que el modo perdure en el tiempo

function validarModo(clave) {
	if (clave === true) {
		body.className = 'modo-oscuro';
		cambioModo.textContent = 'Modo Claro';
	} else {
		body.className = 'modo-claro';
	}
}
validarModo(obtenerDelLocal('Oscuro'));
