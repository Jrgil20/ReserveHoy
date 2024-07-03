const correoRes = sessionStorage.getItem('correoRestaurante');

traePlatos(correoRes);

async function traePlatos(correoRes){
    try {
        const response = await fetch('/consultarPlatos/' + correoRes);
        //hacemos una peticion a la ruta /buscarReserva/ + el valor de la url
        //la palabra reservada await hace que la funcion se espere a que la promesa se resuelva
        const data = await response.json();
        //esperamos a que la promesa se resuelva y guardamos el resultado en la variable data
        //la funcion json() convierte la respuesta del servidor en un objeto json
      
      } catch (error) {
        console.error('Error:', error);
      }
}