const cliente = "ilianaguilarte@gmail.com"

fetch('/eliminarCliente',{
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({correo: cliente}),
})
.then(response => response.text())
.then(data => {
    alert(data);
})
.catch((error) => {
    console.error('Error:', error);
});