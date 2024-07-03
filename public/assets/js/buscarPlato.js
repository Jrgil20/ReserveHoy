const correoResPlat = sessionStorage.getItem('correoRestaurante');


fetch(`/consultarPlatos/${correoResPlat}`)
 .then(response => response.json())
 .then(data => {
    console.log(data);

    let contenedorPlatos = document.getElementById('platos'); // Este es el contenedor principal
    let platosPorTipo = {};

    data.forEach(plato => {
      let tipo = plato.tipo;
      if (!platosPorTipo[tipo]) {
        platosPorTipo[tipo] = [];
      }
      platosPorTipo[tipo].push(plato);
    });

    for (let tipo in platosPorTipo) {
      let tipoPlato = document.createElement('div');
      tipoPlato.textContent = tipo;

      let contenedorBotones = document.createElement('div'); // Contenedor para los botones de platos
      platosPorTipo[tipo].forEach(plato => {
        let botonPlato = document.createElement('button');
        botonPlato.textContent = plato.nombrePlato;
        botonPlato.dataset.platoId = plato.id; // Asignar un dataset para identificar el plato
        botonPlato.className = 'btn btn-secondary'; // Agrega la clase btn y btn-secondary

        botonPlato.addEventListener('click', (e) => {
          let platoId = e.target.dataset.platoId;
          let platoDetallado = data.find(plato => plato.id === platoId);
          mostrarInformacionDetallada(platoDetallado);
        });

        contenedorBotones.appendChild(botonPlato);
      });

      tipoPlato.appendChild(contenedorBotones);
      contenedorPlatos.appendChild(tipoPlato);
    }
  })
 .catch(error => {
    console.error('Error:', error);
  });

function mostrarInformacionDetallada(plato) {
  let modalBody = document.getElementById('modal-body');
  modalBody.innerHTML = `
    <h2>${plato.nombrePlato}</h2>
    <p>Tipo de Plato: ${plato.tipo}</p>
    <p>Descripción: ${plato.descripcion}</p>
    <p>Precio: ${plato.precio}</p>
    <!-- Agrega más información según sea necesario -->
  `;

  let modal = new bootstrap.Modal(document.getElementById('modalPlatoDetallado'));
  modal.show();
}