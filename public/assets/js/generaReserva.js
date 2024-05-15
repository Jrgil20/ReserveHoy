const urlParams = new URLSearchParams(window.location.search);
//creamos una variable que obtenga el valor de la url
const idDeLaReserva = urlParams.get('reserva');
// obtenemos el valor de la url

buscarReserva(idDeLaReserva);
//llamamos a la funcion buscarReserva con el valor de la url

async function buscarReserva(idDeLaReserva) {
  try {
    const response = await fetch('/buscarReserva/' + idDeLaReserva);
    //hacemos una peticion a la ruta /buscarReserva/ + el valor de la url
    //la palabra reservada await hace que la funcion se espere a que la promesa se resuelva
    const data = await response.json();
    //esperamos a que la promesa se resuelva y guardamos el resultado en la variable data
    //la funcion json() convierte la respuesta del servidor en un objeto json

    console.log('Datos de respuesta:',data);
    // se imprime en consola el objeto data para comprobar que se obtuvo la informacion
    document.getElementById('NumeroDeReserva').textContent = data.idReserva;
    document.getElementById('NPersonas').textContent = data.numeroPersona;
    document.getElementById('FechaQueSeReserva').textContent = data.fecha;
    document.getElementById('HoraDeReserva').textContent = data.hora;
    document.getElementById('CorreoDeQuienReserva').textContent = data.correoCli;
    // se actualizza los elementos del html con la informacion obtenida del servidor
  } catch (error) {
    console.error('Error:', error);
  }
}