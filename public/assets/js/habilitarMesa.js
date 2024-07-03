
// Habilitar mesa

//falta conexion
    const id_Mesa = 2;
    const correoRes = 'subway@gmail.com';
    const status = 1;
     fetch ('/habilitarMesa', {
         method: 'PATCH',
         headers: {
             'Content-Type': 'application/json'
         },
         body: JSON.stringify({id_Mesa:id_Mesa, correoRes:correoRes, status:status}),
     })
     .then(response => response.text())
     .then(data => {
        alert(data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });




   
