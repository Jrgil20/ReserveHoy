
// Habilitar mesa
//falta conexion
    const id_Mesa = 12;
    const correoRes = 'massielperozob@hotmail.com';
    const status = 0;
     fetch ('/habilitarMesa', {
         method: 'PATCH',
         headers: {
             'Content-Type': 'application/json'
         },
         body: JSON.stringify({id_Mesa:id_Mesa, correoRes:correoRes, status:status})
     })




   
