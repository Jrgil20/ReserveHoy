const urlParams = new URLSearchParams(window.location.search);
//creamos una variable que obtenga el valor de la url
const correoRes = urlParams.get('restaurante');
// obtenemos el valor de la url

cargaPerfil(correoRes);

async function cargaPerfil(correoRes){
    try {
        const response = await fetch('/traeRest/' + correoRes);
        //hacemos una peticion a la ruta /buscarReserva/ + el valor de la url
        //la palabra reservada await hace que la funcion se espere a que la promesa se resuelva
        const data = await response.json();
        //esperamos a que la promesa se resuelva y guardamos el resultado en la variable data
        //la funcion json() convierte la respuesta del servidor en un objeto json
        document.getElementById('NombreDelRestaurante').textContent = data.nombre;
        if(data.descripcion){
          document.getElementById('DescripcionDelRestaurant').textContent = data.descripcion;
          document.getElementById('botoninformacionRestaurante').style.display = "none";
          document.getElementById('botonModificarInfo').style.display = "block";
        } else {
          document.getElementById('DescripcionDelRestaurant').textContent = "No hay descripción";
          document.getElementById('botoninformacionRestaurante').style.display = "block";
          document.getElementById('botonModificarInfo').style.display = "none";
        }
        document.getElementById('TelefonoDelRestaurant').textContent = data.telefono;
        if(data.direccion){
          document.getElementById('DireccionDelRestaurant').textContent = data.direccion;
        } else {
          document.getElementById('DireccionDelRestaurant').textContent = "No hay dirección";
        }
        if(data.horLunVier){
          document.getElementById('HorLunVierDelRestaurant').textContent = data.horLunVier;
        } else {
          document.getElementById('HorLunVierDelRestaurant').textContent = "No hay horario";
        }
        if(data.horSabDom){
          document.getElementById('HorSabDomDelRestaurant').textContent = data.horSabDom;
        } else {
          document.getElementById('HorSabDomDelRestaurant').textContent = "No hay horario";
        }
        document.getElementById('correoResPlat').value = correoRes;
        document.getElementById('claveActual').value = data.clave;

      } catch (error) {
        console.error('Error:', error);
      }
}

// Guardar correo del restaurante en sessionStorage
sessionStorage.setItem('correoRestaurante', correoRes);