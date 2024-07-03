document.getElementById('editarPerfilForm').addEventListener('submit', function(event) {
      event.preventDefault();

    const correo = document.getElementById('correoCliente').textContent;

    const nombre = document.getElementById('nombre').value;

    const telefono = document.getElementById('telefono').value;

    fetch ('/modificarCliente', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({NombreApellido:nombre, correo:correo, telefono:telefono})
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        location.reload();
    })
    .catch((error) => {
        console.error('Error:', error);
    });

})
    
    