console.log('entro en gereraReserva.js');
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
    const reserva = (data && Array.isArray(data) && data.length > 0) ? data[0] : null;
    //esperamos a que la promesa se resuelva y guardamos el resultado en la variable data
    //la funcion json() convierte la respuesta del servidor en un objeto json
    const responsePersona = await fetch('/buscarCliente/'+reserva.correoCli);
    const correoPersona = await responsePersona.json();
    const cliente = (correoPersona && Array.isArray(correoPersona) && correoPersona.length > 0) ? correoPersona[0] : null;
    const responseRes = await fetch('/buscarrestaurante/'+idDeLaReserva)
    const restaurante = await responseRes.json();
    console.log(restaurante.nombre);
    
    // se imprime en consola el objeto data para comprobar que se obtuvo la informacion
    document.getElementById('PersonaQueReserva').textContent = cliente.NombreApellido;
    document.getElementById('PersonaCualReserva').textContent = cliente.NombreApellido;
    document.getElementById('NumeroDeReserva').textContent = reserva.idReserva;
    document.getElementById('NPersonas').textContent = reserva.numeroPersona;
    document.getElementById('FechaQueSeReserva').textContent = reserva.fecha;
    document.getElementById('HoraDeReserva').textContent = reserva.hora;
    document.getElementById('CorreoDeQuienReserva').textContent = reserva.correoCli;
    document.getElementById('RestauranteDondeReserva').textContent = restaurante.nombre;
    // se actualizza los elementos del html con la informacion obtenida del servidor
  } catch (error) {
    console.error('Error:', error);
  }
}