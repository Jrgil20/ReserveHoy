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
          console.log(`Botón OK presionado para ${plato.nombre}`);
          // Aquí puedes agregar lo que suceda cuando se presione el botón
        });
        celdaBoton.appendChild(botonOk);
        filaPlato.appendChild(celdaBoton);
    
        tablaPlatos.appendChild(filaPlato);
      });
    
      contenedorTipoPlato.appendChild(tablaPlatos);
      contenedorPlatos.appendChild(contenedorTipoPlato); // Asegúrate de que 'contenedorPlatos' es tu contenedor principal
    }
  });