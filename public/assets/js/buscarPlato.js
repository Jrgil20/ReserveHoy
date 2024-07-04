const correoResPlat = sessionStorage.getItem('correoRestaurante');
if (correoResPlat) {
  // El código para cuando correoResPlat existe
} else {
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
      let contenedorTipoPlato = document.createElement('div');
      contenedorTipoPlato.className = 'tipo-plato-contenedor';
    
      let tituloTipoPlato = document.createElement('h3');
      tituloTipoPlato.textContent = tipo;
      contenedorTipoPlato.appendChild(tituloTipoPlato);
    
      let tablaPlatos = document.createElement('table');
      tablaPlatos.className = 'plato-contenedor';
    
      platosPorTipo[tipo].forEach(plato => {
        let filaPlato = document.createElement('tr');
    
        let celdaNombrePlato = document.createElement('td');
        celdaNombrePlato.textContent = plato.nombrePlato; 
        filaPlato.appendChild(celdaNombrePlato);
    
        let celdaBoton = document.createElement('td');
        let botonOk = document.createElement('button');
        botonOk.innerHTML = '<i class="fas fa-info"></i>';
        botonOk.className = 'btn btn-info';
        // Aquí puedes agregar un event listener al botón si necesitas manejar clics
        botonOk.addEventListener('click', () => {
          console.log(`Botón info presionado para ${plato.nombrePlato}`);
          
        });

        celdaBoton.appendChild(botonOk);
        filaPlato.appendChild(celdaBoton);

        let celdaBotonModificar = document.createElement('td');
        let botonModificar = document.createElement('button');
        botonModificar.innerHTML = '<i class="fas fa-edit"></i>';
        botonModificar.className = 'btn btn-primary';
        // Aquí puedes agregar un event listener al botón si necesitas manejar clics
        botonModificar.addEventListener('click', () => {
          console.log(`Botón modificar presionado para ${plato.nombre}`);
            let modificarForm = document.getElementById('modificarForm');
            if (modificarForm.style.display === 'block') {
              modificarForm.style.display = 'none';
            } else {
              modificarForm.style.display = 'block';
            }

            document.getElementById('nombrePlatoModificar').value =plato.nombrePlato;
            document.getElementById('nombrePlatoModificar').readOnly = true;
            document.getElementById('tipoPlatoModificar').value = plato.tipo;
            document.getElementById('precioPlatoModificar').value =plato.precio;
            document.getElementById('descripPlatoModificar').value = plato.descripcion;
        });

        celdaBotonModificar.appendChild(botonModificar);
        filaPlato.appendChild(celdaBotonModificar);
        
        let celdaBotonEliminar = document.createElement('td');
        let botonEliminar = document.createElement('button');
        botonEliminar.innerHTML = '<i class="fas fa-trash"></i>';
        botonEliminar.className = 'btn btn-danger';
        // Aquí puedes agregar un event listener al botón si necesitas manejar clics
        botonEliminar.addEventListener('click', () => {
          console.log(`Botón eliminar presionado para ${plato.nombrePlato}`);
          let eliminarForm = document.getElementById('eliminarForm');
          if (eliminarForm.style.display === 'block') {
            eliminarForm.style.display = 'none';
          } else {
            eliminarForm.style.display = 'block';
          }

          document.getElementById('nombrePlatoEliminar').value = plato.nombrePlato;
          document.getElementById('nombrePlatoEliminar').readOnly = true;

        });

        celdaBotonEliminar.appendChild(botonEliminar);
        filaPlato.appendChild(celdaBotonEliminar);

        tablaPlatos.appendChild(filaPlato);
      });
    
      contenedorTipoPlato.appendChild(tablaPlatos);
      contenedorPlatos.appendChild(contenedorTipoPlato); // Asegúrate de que 'contenedorPlatos' es tu contenedor principal
    }
  });