console.log('El archivo modificar mesa ha sido llamado');

    const numMesa = 20;
    const id_Mesa = 62;
    const correoRes = "massielperozob@hotmail.com";
    const capacidad = 3;
    const status = 1;
    
    fetch ('/modificarMesa', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({status:status, capacidad:capacidad, numMesa:numMesa, correoRes:correoRes, id_Mesa:id_Mesa
        })
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
    


