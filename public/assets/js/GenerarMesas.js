const urlParams = new URLSearchParams(window.location.search);
//creamos una variable que obtenga el valor de la url
const correoRes = urlParams.get('restaurante');
// obtenemos el valor de la url

traeMesas(correoRes);

async function traeMesas(correoRes){
    try {
        const response = await fetch('/buscarMesasRest/' + correoRes);
        //hacemos una peticion a la ruta /buscarReserva/ + el valor de la url
        //la palabra reservada await hace que la funcion se espere a que la promesa se resuelva
        const data = await response.json();
        //esperamos a que la promesa se resuelva y guardamos el resultado en la variable data
        //la funcion json() convierte la respuesta del servidor en un objeto json
        document.getElementById('restaurante').value = correoRes;
      } catch (error) {
        console.error('Error:', error);
      }
}

// Guardar correo del restaurante en sessionStorage
sessionStorage.setItem('correoRestaurante', correoRes);