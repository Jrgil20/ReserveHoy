console.log('El archivo modificar informacion del restaurante ha sido llamado');


    const nombre = "massiel";
    const direccion = "el paraiso";
    const telefono = "04242849369";
    const clave = "1234";
    const correoRes = "massielperozob@hotmail.com";
    const descripcion = "restaurante de comida rapida";
    
    
    fetch ('/modificarInfoRestaurante', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({nombre:nombre,direccion:direccion,telefono:telefono,clave:clave,correoRes:correoRes,descripcion:descripcion
        })
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });

    