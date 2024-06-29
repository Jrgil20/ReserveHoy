
document.getElementById('platForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Evita que el formulario se envíe de la manera predeterminada
    
        console.log("El archvio agregPlato fue llamado");

        const tipoPlato = document.getElementById('tipoPlato').value;
        const nombrePlato = document.getElementById('nombrePlato').value;
        const precioPlato = document.getElementById('precioPlato').value;
        const descrip = document.getElementById('descripPlato').value;
        const correoRest = document.getElementById('correoResPlat').value;
    
        fetch('/agregarPlato',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({correoRestaurante:correoRest, nombrePlato: nombrePlato, tipo: tipoPlato, precio:precioPlato, descripcion:descrip}),
        })
        .then(response => response.text())
        .then(data => alert(data))
        .catch((error) => {
            console.error('Error:', error);
        });
    });
