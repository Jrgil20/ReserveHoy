const cliente = sessionStorage.getItem('correoCliente');


fetch('/eliminarCliente',{
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({correo: cliente}),
})
.then(response => response.json())
.then(data => {
    if (data.message) {
        alert(data.message);
    }
    sessionStorage.removeItem('correoCliente');
    if (data.url) {
        window.location.href = data.url;
    }
})
.catch((error) => {
    console.error('Error:', error);
});