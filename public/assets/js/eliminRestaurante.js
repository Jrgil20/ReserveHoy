const local = "mcdonalds@gmail.com"

fetch('/eliminarRestaurante',{
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({correoRes: local}),
})
.then(response => response.text())
.then(data => {
    alert(data);
})
.catch((error) => {
    console.error('Error:', error);
});