const correoRes = sessionStorage.getItem('correoRestaurante');

traeMesas(correoRes);

async function traeMesas(correoRes){
    try {
        const response = await fetch('/buscarMesasRest/' + correoRes);
        const data = await response.json();
        document.getElementById('correoRestaurante').value = correoRes;

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

          // Crea un elemento <td> para los botones de modificar y eliminar
          let tdBotones = document.createElement('td');
          let botonModificar = document.createElement('button');
          botonModificar.textContent = 'Modificar';
          botonModificar.className = 'btn btn-primary tooltip';
          botonModificar.title = 'Modificar Mesa'; // Agrega el texto del tooltip
          botonModificar.dataset.mesaId = mesa.id_Mesa;
          tdBotones.appendChild(botonModificar);

          let botonEliminar = document.createElement('button');
          botonEliminar.textContent = 'Eliminar';
          botonEliminar.className = 'btn btn-danger';
          botonEliminar.title = 'Eliminar Mesa'; // Agrega el texto del tooltip
          botonEliminar.dataset.mesaId = mesa.id_Mesa;
          tdBotones.appendChild(botonEliminar);

          tr.appendChild(tdBotones);

          padre.appendChild(tr)
        }
      } catch (error) {
        console.error('Error:', error);
      }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('#mesasList button[data-mesa-id]').forEach(boton => {
    boton.addEventListener('click', (e) => {
      let mesaId = e.target.dataset.mesaId;
      if (e.target.textContent === 'Modificar') {
        // Lógica para modificar la mesa
        console.log(`Modificar mesa ${mesaId}`);
      } else if (e.target.textContent === 'Eliminar') {
        // Lógica para eliminar la mesa
        console.log(`Eliminar mesa ${mesaId}`);
      }
    });
  });
});
