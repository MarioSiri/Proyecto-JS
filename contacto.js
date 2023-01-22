//Se crean todas las variables necesarias, para interactuar con el DOM

const formContacto = document.querySelector('#contact-form');
const inputName = document.querySelector('#name');
const inputCorreo = document.querySelector('#email');
const inputAsunto = document.querySelector('#subject');
const inputMensaje = document.querySelector('#message');


//Mediante un evento se realiza una validación bastante basica del formulario de contacto, el email es validado mediante expresiones regulares.

//Como para darle alguna funcionalidad mas si pasa la validacion se guarda el mensaje en localStorage, y se envia una sweetAlert tanto si se envio bien o sino.

formContacto.onsubmit = (event) => {
	event.preventDefault();
	let emailVal = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if (
		inputName.value.length > 3 &&
		emailVal.test(inputCorreo.value) &&
		inputAsunto.value.length > 4 &&
		inputMensaje.value.length > 10
	) {
		subiendoAlLocal('mensaje', {
			nombre: inputName.value,
			email: inputCorreo.value,
			asunto: inputAsunto.value,
			mensaje: inputMensaje.value,
		});
		swal('SU MENSAJE FUE ENVIADO');
		formContacto.reset();
	} else {
		swal('DEBE RELLENAR BIEN LOS CAMPOS', 'NO SE PUDO ENVIAR MENSAJE');
		formContacto.reset();
	}
};

