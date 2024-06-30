const idAEliminar = 5;

const correoRest = "mcdonalds@gmail.com";

fetch('/eliminarMesa',{
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({idAEliminar:idAEliminar, correoRes: correoRest}),
})
.then(response => response.text())
.then(data => {
    alert(data);
    location.reload();
})
.catch((error) => {
    console.error('Error:', error);
});