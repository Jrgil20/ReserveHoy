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

        let padre = document.getElementById('mesasList'); 

        //Recorre la lista de mesas del restaurante
        for(let mesa of data){
            // Crea un elemento <tr> para cada mesa
          let tr = document.createElement('tr');

          // Crea un elemento <td> para el id
          let tdidMesa= document.createElement('td');
          tdidMesa.textContent = mesa.id_Mesa;
          tr.appendChild(tdidMesa);

          //Crea un elemento <td> para la capacidad
           
           let tdPuestos = document.createElement('td');
           tdPuestos.textContent = mesa.capacidad;
           tr.appendChild(tdPuestos);

          // Crea un elemento <td> para la el estatus de la mesa
          let tdStatus = document.createElement('td');
          tdStatus.textContent = mesa.status;
          tr.appendChild(tdStatus);

          padre.appendChild(tr)
        }
      } catch (error) {
        console.error('Error:', error);
      }
}

// Guardar correo del restaurante en sessionStorage
sessionStorage.setItem('correoRestaurante', correoRes);