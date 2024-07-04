async function traeRestaurantes() {
  try {
    const response = await fetch('/traeRestaurantes/');
    const data = await response.json();

    let padre = document.getElementById('ListaDeRestaurantes');
    displayRestaurantes(data, padre); // Muestra inicialmente todos los restaurantes

    // Evento de entrada para el campo de búsqueda
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', () => {
      const textoFiltrado = searchInput.value.toLowerCase();
      const datosFiltrados = data.filter(restaurante => restaurante.nombre.toLowerCase().includes(textoFiltrado));
      displayRestaurantes(datosFiltrados, padre); // Muestra los restaurantes filtrados
    });

  } catch (error) {
    console.error('Error:', error);
  }
}

function displayRestaurantes(data, padre) {
  padre.innerHTML = ''; // Limpia el contenedor antes de mostrar los resultados filtrados
  for (let restaurante of data) {
    let col = document.createElement('div');
    col.className = 'col-md-12';

    let card = document.createElement('div');
    card.className = 'card';

    let img = document.createElement('img');
    img.src = '/assets/img/Restaurant.png';
    img.className = 'card-img-top';
    img.alt = 'Imagen del producto';

    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    let h5 = document.createElement('h5');
    h5.className = 'card-title';
    h5.textContent = restaurante.nombre;

    let p = document.createElement('p');
    p.className = 'card-text';
    p.textContent = restaurante.correoRes;

    let a = document.createElement('a');
    a.href = 'restaurant.html?restaurante=' + restaurante.correoRes;
    a.className = 'btn btn-primary';
    a.textContent = 'Ver más';

    cardBody.appendChild(h5);
    cardBody.appendChild(p);
    cardBody.appendChild(a);

    card.appendChild(img);
    card.appendChild(cardBody);

    col.appendChild(card);

    padre.appendChild(col);
  }
}

traeRestaurantes();