document.getElementById('mesaForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de la manera predeterminada

    const capacidad = document.getElementById('numAsi').value;
    const restaurante = document.getElementById('restaurante').value;
    
    fetch('/agregarMesa',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({capacidad:capacidad, restaurante:restaurante}),
    })
    .then(response => response.text())
    .then(data => alert(data))
    .catch((error) => {
        console.error('Error:', error);
    });
});