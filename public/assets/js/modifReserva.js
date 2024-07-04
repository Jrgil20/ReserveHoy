console.log('El archivo modificar reserva ha sido llamado');

const urlPar = new URLSearchParams(window.location.search);
const idReserva = urlPar.get('reserva');
console.log(idReserva);
document.getElementById('modificarReservaForm').addEventListener("submit", function(event) {
event.preventDefault();
let reserva = idReserva; 
let FechayhoradelaReserva = event.target.elements.FechayhoradelaReserva.value;
let [fechadelaReserva, horaDelaReserva] = FechayhoradelaReserva.split('T');
let cantidad = document.getElementById('personas').value;
console.log(reserva, fechadelaReserva, horaDelaReserva, cantidad);
fetch ('/modificarReserva', {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        idReserva: reserva,
        fecha: fechadelaReserva,
        hora: horaDelaReserva,
        numeroPersona: cantidad,
    })
})
.then(response => response.text())
.then(data => {
    alert(data);
})
.catch((error) => {
    console.error('Error:', error);
});

})

