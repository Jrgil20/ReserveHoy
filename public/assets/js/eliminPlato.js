const restaurante = sessionStorage.getItem('correoRestaurante');

document.getElementById('eliminarPlatoForm').addEventListener('submit', function(event){
    event.preventDefault();

    const nombrePlato = event.target.elements.nombrePlatoEliminar.value;

    fetch('/eliminarPlato',{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({nombrePlato:nombrePlato, correoRes: restaurante}),
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});