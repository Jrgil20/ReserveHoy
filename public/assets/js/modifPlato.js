console.log('El archivo modificar plato ha sido llamado');

document.getElementById('modificarPlatoForm').addEventListener("submit", function(event) {
event.preventDefault();

const correoRes = sessionStorage.getItem('correoRestaurante');

const nombrePlato = document.getElementById('nombrePlatoModificar').value;

const tipo = document.getElementById('tipoPlatoModificar').value;

const precio = document.getElementById('precioPlatoModificar').value;

const descripcion = document.getElementById('descripPlatoModificar').value;

fetch ('/modificarPlato', {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({nombrePlato: nombrePlato,tipo: tipo,precio: precio,descripcion: descripcion,correoRes: correoRes,
    })
})
.then(response => response.text())
.then(data => {
    alert(data);
})
.catch((error) => {
    console.error('Error:', error);
});
})

    
