const urlParams = new URLSearchParams(window.location.search);
//creamos una variable que obtenga el valor de la url
const correoRes = urlParams.get('restaurante');
// obtenemos el valor de la url

traeReservas(correoRes);

async function traeReservas(correoRes){
    try {
        const response = await fetch('/traeRest/' + correoRes);
        //hacemos una peticion a la ruta /buscarReserva/ + el valor de la url
        //la palabra reservada await hace que la funcion se espere a que la promesa se resuelva
        const data = await response.json();
        console.log(data);
        //esperamos a que la promesa se resuelva y guardamos el resultado en la variable data
        //la funcion json() convierte la respuesta del servidor en un objeto json
        document.getElementById('NombreDelRestaurante').textContent = data.nombre;
        document.getElementById('DescripcionDelRestaurant').textContent = data.direccion;        ;
        document.getElementById('TelefonoDelRestaurant').textContent = data.telefono;
        document.getElementById('DireccionDelRestaurant').textContent = data.direccion;
      } catch (error) {
        console.error('Error:', error);
      }
}
