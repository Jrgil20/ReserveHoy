const parametros = new URLSearchParams(window.location.search);
//creamos una variable que obtenga el valor de la url
const correoCli = parametros.get('cliente');
// obtenemos el valor de la url

traeReservas(correoCli);

async function traeReservas(correoCli){
    try {
        const response = await fetch('/buscarReservasCli/' + correoCli);
        //hacemos una peticion a la ruta /buscarReserva/ + el valor de la url
        //la palabra reservada await hace que la funcion se espere a que la promesa se resuelva
        const data = await response.json();
        //esperamos a que la promesa se resuelva y guardamos el resultado en la variable data
        //la funcion json() convierte la respuesta del servidor en un objeto json
        // Obtén el elemento padre donde quieres añadir los nuevos elementos
        console.log(data);
      }catch (error) {
        console.error('Error:', error);
      }
}