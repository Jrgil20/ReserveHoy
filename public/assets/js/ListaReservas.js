const urlParams = new URLSearchParams(window.location.search);
//creamos una variable que obtenga el valor de la url
const correoRes = urlParams.get('restaurante');
// obtenemos el valor de la url

traeReservas(correoRes);

async function traeReservas(correoRes){
    try {
        const response = await fetch('/buscarReservasRest/' + correoRes);
        //hacemos una peticion a la ruta /buscarReserva/ + el valor de la url
        //la palabra reservada await hace que la funcion se espere a que la promesa se resuelva
        const data = await response.json();
        //esperamos a que la promesa se resuelva y guardamos el resultado en la variable data
        //la funcion json() convierte la respuesta del servidor en un objeto json
         console.log(data);
        // Obtén el elemento padre donde quieres añadir los nuevos elementos
        let padre = document.getElementById('ReservasList'); 

        // Recorre la lista de reservas del restaurante
        for (let reserva of data) {
        
          // Crea un elemento <tr> para cada reserva
          let tr = document.createElement('tr');

          // Crea un elemento <td> para el nombre de la reserva
          let tdNombre = document.createElement('td');
          tdidReserva.textContent = reserva.idReserva;
          tr.appendChild(tdidReserva);

          // Crea un elemento <td> para la fecha de la reserva
          let tdFecha = document.createElement('td');
          tdFecha.textContent = reserva.fecha;
          tr.appendChild(tdFecha);

          // Crea un elemento <td> para la hora de la reserva
          let tdHora = document.createElement('td');
          tdHora.textContent = reserva.hora;
          tr.appendChild(tdHora);

          // Crea un elemento <td> para el número de personas
          let tdPersonas = document.createElement('td');
          tdPersonas.textContent = reserva.personas;
          tr.appendChild(tdPersonas);

          // Crea un elemento <td> para el estado de la reserva
          let tdEstado = document.createElement('td');
          tdEstado.textContent = reserva.estado;
          tr.appendChild(tdEstado);

          // Crea un elemento <td> para el botón de confirmar la reserva
          let tdBotonConfirm = document.createElement('td');
          let BotonConfirm = document.createElement('button');
          boton.textContent = 'Confirmar';

          // Crea un elemento <td> para el botón de cancelar la reserva
          let tdBotonCancel = document.createElement('td');
          let botonCancel = document.createElement('button');
          boton.textContent = 'Cancelar';

          // Añade el elemento <tr> al elemento padre
          padre.appendChild(tr);
        
        }

      } catch (error) {
        console.error('Error:', error);
      }
}
