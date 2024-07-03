document.getElementById('correoRestaurante').value = sessionStorage.getItem('correoRestaurante');

document.getElementById('FormInformacionRestaurante').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de la manera predeterminada

    let descripcion = event.target.elements.descripcion.value;
    let direccion = event.target.elements.direccion.value;
    let horarioinicio = event.target.elements.horarioInicio.value;
    let horariofin = event.target.elements.horarioFin.value;
    let horario = horarioinicio + " - " + horariofin;
    let horarioIniciofindesemana = event.target.elements.horarioIniciofindesemana.value;
    let horarioFinfindesemana = event.target.elements.horarioFinfindesemana.value;
    let horFin = horarioIniciofindesemana + " - " + horarioFinfindesemana;
    let restaurante = document.getElementById('correoRestaurante').value;

    
    fetch('/actualizarInformacionRestaurante',{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({claveLocal:restaurante, direccion:direccion, descripcion:descripcion, horario:horario, horFin:horFin}),
    })
    .then(response => response.text())
    .then(data => alert(data))
    .catch((error) => {
        console.error('Error:', error);
    });
});