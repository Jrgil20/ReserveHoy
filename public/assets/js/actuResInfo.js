document.getElementById('infForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de la manera predeterminada

    const descripcion= document.getElementById('descripcion').value;
    const direccion = document.getElementById('direccion').value;
    const horario = document.getElementById('horario').value;
    const horFin = document.getElementById('horarioFin').value;
    const restaurante = document.getElementById('correoResPlat').value;
    
    fetch('/actuInfoRestau',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({claveLocal:restaurante, direccion:direccion, descripcion:descripcion, horario:horario, horFin:horFin}),
    })
    .then(response => response.text())
    .then(data => alert(data))
    .catch((error) => {
        console.error('Error:', error);
    });
});