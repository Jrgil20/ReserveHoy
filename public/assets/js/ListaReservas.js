const urlParams = new URLSearchParams(window.location.search);
//creamos una variable que obtenga el valor de la url
const correoRes = urlParams.get('restaurante');
// obtenemos el valor de la url

function confirmarReserva(idActivado){
  const idBoton = idActivado;
  
  const filaSeleccionada = document.getElementById(`fila${idBoton.substring(10,idBoton.length)}`);

  const elementos = filaSeleccionada.getElementsByTagName('td');

  const destinatario = elementos[1].innerHTML;

  const idReserva = elementos[0].innerHTML;

  const restaurante = sessionStorage.getItem('correoRestaurante');

  fetch('/confirmarReserva', {
      method: 'PATCH',
         headers: {
             'Content-Type': 'application/json'
         },
         body: JSON.stringify({idReserva:idReserva ,destinatario:destinatario, restaurante:restaurante, estado:1}),
     })
     .then(response => response.text())
     .then(data => {
        alert(data);
        location.reload();
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function cancelarReserva(idActivado){
  const idBoton = idActivado;

  const filaSeleccionada = document.getElementById(`fila${idBoton.substring(10,idBoton.length)}`);

  const elementos = filaSeleccionada.getElementsByTagName('td');

  const destinatario = elementos[1].innerHTML;

  const idReserva = elementos[0].innerHTML;

  const restaurante = sessionStorage.getItem('correoRestaurante');

  fetch('/cancelarReserva', {
      method: 'DELETE',
         headers: {
             'Content-Type': 'application/json'
         },
         body: JSON.stringify({idReserva:idReserva ,destinatario:destinatario, restaurante:restaurante}),
     })
     .then(response => response.text())
     .then(data => {
        alert(data);
        location.reload();
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

traeReservas(correoRes);

async function traeReservas(correoRes) {
  try {
    const response = await fetch('/buscarReservasRest/' + correoRes);
    let data = await response.json(); // Asegúrate de que esta línea esté fuera del if para poder usar 'data' después

    let padre = document.getElementById('ReservasList');
    displayReservas(data, padre); // Muestra inicialmente todas las reservas

    // Evento de entrada para el campo de búsqueda
    const searchInput = document.getElementById('searchReservasInput');
    searchInput.addEventListener('input', () => {
      const textoFiltrado = searchInput.value.toLowerCase();
      const datosFiltrados = textoFiltrado ? data.filter(reserva => reserva.correoCli.toLowerCase().includes(textoFiltrado) || reserva.idReserva.toString().toLowerCase().includes(textoFiltrado)) : data;
      displayReservas(datosFiltrados, padre); // Muestra las reservas filtradas
    });

  } catch (error) {
    console.error('Error:', error);
  }
}

function displayReservas(data, padre) {
  padre.innerHTML = ''; // Limpia el contenedor antes de mostrar los resultados filtrados
  let i=0;
  for (let reserva of data) {
    // Crea un elemento <tr> para cada reserva
    let tr = document.createElement('tr');
    tr.setAttribute('id',`fila${i}`); 

    // Crea un elemento <td> para el id
    let tdidReserva= document.createElement('td');
    tdidReserva.textContent = reserva.idReserva;
    tr.appendChild(tdidReserva);

    //Crea un elemento <td> para el nombre
     
     let tdNombre = document.createElement('td');
     tdNombre.textContent = reserva.correoCli;
     tr.appendChild(tdNombre);

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
    tdPersonas.textContent = reserva.numeroPersona;
    tr.appendChild(tdPersonas);

    // Crea un elemento <td> para el estado de la reserva
    let tdEstado = document.createElement('td');
    tdEstado.textContent = reserva.estado;
    tr.appendChild(tdEstado);

    // Crea un elemento <td> para el botón de confirmar la reserva
    let tdBotonConfirm = document.createElement('td');
    let BotonConfirm = document.createElement('button');
    BotonConfirm.textContent = 'Confirmar';
    BotonConfirm.setAttribute('id',`botonConfi${i}`)
    BotonConfirm.addEventListener('click', () => {
      confirmarReserva(BotonConfirm.getAttribute('id'));
    }); // Agrega el evento de clic

    // Crea un elemento <td> para el botón de cancelar la reserva
    let tdBotonCancel = document.createElement('td');
    let botonCancel = document.createElement('button');
    botonCancel.textContent = 'Cancelar';
    botonCancel.addEventListener('click', () => {
      cancelarReserva()
    }); // Agrega el evento de clic

    // Añade el elemento <tr> al elemento padre
    padre.appendChild(tr);
    i++;
  }
}

