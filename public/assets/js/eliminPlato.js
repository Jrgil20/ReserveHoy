const restaurante = "mccdonalds@gmail.com";

const idAEliminar = 33;

fetch('/eliminarPlato',{
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({idAEliminar:idAEliminar, correoRes: correoRestaurante}),
})
.then(response => response.text())
.then(data => {
    console.log(data);
})
.catch((error) => {
    console.error('Error:', error);
});