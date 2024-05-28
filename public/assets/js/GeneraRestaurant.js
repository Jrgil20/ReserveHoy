const urlParams = new URLSearchParams(window.location.search);
//creamos una variable que obtenga el valor de la url
const correoRes = urlParams.get('restaurante');
// obtenemos el valor de la url


traeReservas(correoRes);
traeMesas(correoRes);

async function traeReservas(correoRes){
    try {
        const response = await fetch('/traeRest/' + correoRes);
        //hacemos una peticion a la ruta /buscarReserva/ + el valor de la url
        //la palabra reservada await hace que la funcion se espere a que la promesa se resuelva
        const data = await response.json();
        //esperamos a que la promesa se resuelva y guardamos el resultado en la variable data
        //la funcion json() convierte la respuesta del servidor en un objeto json
        document.getElementById('NombreDelRestaurante').textContent = data.nombre;
        document.getElementById('DescripcionDelRestaurant').textContent = data.descripcion;
        document.getElementById('TelefonoDelRestaurant').textContent = data.telefono;
        document.getElementById('DireccionDelRestaurant').textContent = data.direccion;
        document.getElementById('CorreoDelRestaurante').value = correoRes;
      } catch (error) {
        console.error('Error:', error);
      }
}

async function traeMesas(correoRes){
    try {
        const response = await fetch('/buscarMesasRest/' + correoRes);
        //hacemos una peticion a la ruta /buscarReserva/ + el valor de la url
        //la palabra reservada await hace que la funcion se espere a que la promesa se resuelva
        const data = await response.json();
        //esperamos a que la promesa se resuelva y guardamos el resultado en la variable data
        // Obtén el elemento padre donde quieres añadir los nuevos elementos
        let padre = document.getElementById('MesasDelRestaurante'); 

        // Recorre la lista de reservas del restaurante
        for (let mesa of data) {
        
          // Crea un elemento li para cada mesa
          let li = document.createElement('li');
          li.textContent = 'mesa #'+mesa.numMesa+' con capacidad para '+mesa.capacidad+' personas, se encuentra '+mesa.status;
          padre.appendChild(li);

        
        }

      } catch (error) {
        console.error('Error:', error);
      }
}

