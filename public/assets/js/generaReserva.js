const urlParams = new URLSearchParams(window.location.search);
//creamos una variable que obtenga el valor de la url
const idDeLaReserva = urlParams.get('reserva');
// obtenemos el valor de la url

buscarReserva(idDeLaReserva);
//llamamos a la funcion buscarReserva con el valor de la url

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