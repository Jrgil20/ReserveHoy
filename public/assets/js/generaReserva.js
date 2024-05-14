
async function buscarReserva(idDeLaReserva) {
  try {
    const response = await fetch('/buscarReserva/' + idDeLaReserva);
    const data = await response.json();

    console.log(data);
    document.getElementById('NumeroDeReserva').textContent = data.idReserva;
    document.getElementById('NPersonas').textContent = data.numeroPersona;
    document.getElementById('FechaQueSeReserva').textContent = data.fecha;
    document.getElementById('HoraDeReserva').textContent = data.hora;
    document.getElementById('CorreoDeQuienReserva').textContent = data.correoCli;
  } catch (error) {
    console.error('Error:', error);
  }
}

buscarReserva('123'); // este id debe ser el id de la reserva que quieres buscar