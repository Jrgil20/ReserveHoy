console.log('El archivo agregarmesa.js ha sido llamado.');

document.getElementById('correoRestaurante').value = sessionStorage.getItem('correoRestaurante');

document.getElementById('mesaForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de la manera predeterminada

    const capacidad = document.getElementById('capacidad').value;
    
    const restaurante = document.getElementById('correoRestaurante').value;
    
    fetch('/agregarMesa',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({capacidad:capacidad, restaurante:restaurante}),
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        location.reload();
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});