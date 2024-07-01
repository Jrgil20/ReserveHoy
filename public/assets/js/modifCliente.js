console.log('El archivo modificar cliente ha sido llamado');

document.getElementById('clienteLoginForm').addEventListener('submit', function(event) {
    const correo = "paola@gmail.com";
    const nombre = "paolita";
    const telefono = "12345678";
    const pass = "1234";

    
    fetch ('/modificarCliente', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({NombreApellido:nombre, correo:correo, password:pass, telefono:telefono})
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });

})
    
    