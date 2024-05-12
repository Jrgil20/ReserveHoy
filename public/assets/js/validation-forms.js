// Obtener el formulario
const form = document.querySelector('#miFormulario');

// Agregar un evento de escucha para el envío del formulario
form.addEventListener('submit', function(event) {
    // Detener el envío del formulario
    event.preventDefault();

    // Validar los campos del formulario
    if (validarCampos()) {
        // Si los campos son válidos, enviar el formulario
        form.submit();
    }
});

// Función para validar los campos del formulario
function validarCampos() {
    // Obtener los campos del formulario
    const campo1 = document.querySelector('.email');
    const campo2 = document.querySelector('.name');
    // ... Agregar más campos si es necesario

    // Validar cada campo
    if (!/^[a-zA-Z][a-zA-Z0-9]*$/.test(campo1.value)) {
        alert('El campo 1 debe ser texto alfanumérico y no puede iniciar con un número');
        return false;
    }

    if (!/\S+@\S+\.\S+/.test(campo2.value)) {
        alert('El campo 2 debe ser una dirección de correo válida');
        return false;
    }

    const campoTel = document.querySelector('.Tel');

    if (!/^\d{10}$/.test(campoTel.value)) {
        alert('El campo Tel debe contener 10 dígitos numéricos');
        return false;
    }

    // ... Agregar más validaciones si es necesario
    return true;
}