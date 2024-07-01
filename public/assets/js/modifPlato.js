console.log('El archivo modificar plato ha sido llamado');


const idPlato = 49;
const correoRes = "massielperozob@hotmail.com";
const nombrePlato = "Margarita";
const tipo = "pizza";
const precio = 20;
const descripcion = "pizza salida del horno";

fetch ('/modificarPlato', {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({idPlato: idPlato,nombrePlato: nombrePlato,tipo: tipo,precio: precio,descripcion: descripcion,correoRes: correoRes,
    })
})
.then(response => response.text())
.then(data => {
    console.log(data);
})
.catch((error) => {
    console.error('Error:', error);
});

    
