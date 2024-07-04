const correoResPlat = sessionStorage.getItem('correoRestaurante');
 if(correoResPlat){

 } else{
    const url = new URLSearchParams(window.location.search);
    correoResPlat = url.get('restaurante');
 }

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
          
            // Crear el collapse para mostrar la información del plato
            let collapseTemplate = document.getElementById('plato-info-template');
            let collapseHtml = collapseTemplate.innerHTML.replace(/{{platoId}}/g, platoId);
            collapseHtml = collapseHtml.replace('{{platoNombre}}', platoDetallado.nombrePlato);
            collapseHtml = collapseHtml.replace('{{platoTipo}}', platoDetallado.tipo);
            collapseHtml = collapseHtml.replace('{{platoDescripcion}}', platoDetallado.descripcion);
            collapseHtml = collapseHtml.replace('{{platoPrecio}}', platoDetallado.precio);
          
            let collapseElement = document.createElement('div');
            collapseElement.innerHTML = collapseHtml;
            collapseElement.className = 'collapse';
            collapseElement.style.display = 'block';
            document.getElementById('platos').appendChild(collapseElement);
          
            // Mostrar el collapse
            let collapseId = `plato-info-${platoId}`;
            let collapseElementToShow = document.getElementById(collapseId);
            collapseElementToShow.classList.add('show');
          });

          document.querySelectorAll('#platos button[id^="eliminar-plato-"]').forEach(boton => {
            boton.addEventListener('click', () => {
              let platoId = boton.id.replace('eliminar-plato-', '');
              // Lógica para eliminar el plato
              console.log(`Eliminar plato ${platoId}`);
            });
          });
          document.querySelectorAll('#platos button[id^="modificar-plato-"]').forEach(boton => {
            boton.addEventListener('click', () => {
              let platoId = boton.id.replace('modificar-plato-', '');
              // Lógica para modificar el plato
              console.log(`Modificar plato ${platoId}`);
            });
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

