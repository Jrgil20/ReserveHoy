async function traeRestaurantes(){
    try {
        const response = await fetch('/traeRestaurantes/');
        //hacemos una peticion a la ruta /traeRestaurantes
        //la palabra reservada await hace que la funcion se espere a que la promesa se resuelva
        const data = await response.json();
        //esperamos a que la promesa se resuelva y guardamos el resultado en la variable data
        //la funcion json() convierte la respuesta del servidor en un objeto json

        // Obtén el elemento padre donde quieres añadir los nuevos elementos
        let padre = document.getElementById('ListaDeRestaurantes');

        // Recorre la lista de restaurantes aliados
        for (let i = 0; i < 9; i++) {
            let restaurante = data[i];

            // Crea los nuevos elementos
            let col = document.createElement('div');
            col.className = 'col-md-4'; 

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
            a.href = '/view/restaurant.html?restaurante=' + restaurante.correoRes;
            a.className = 'btn btn-primary';
            a.textContent = 'Ver más';

            // Añade los nuevos elementos al DOM
            cardBody.appendChild(h5);
            cardBody.appendChild(p);
            cardBody.appendChild(a);

            card.appendChild(img);
            card.appendChild(cardBody);

            col.appendChild(card);

            padre.appendChild(col);
        }
      } catch (error) {
        console.error('Error:', error);
      }
}

traeRestaurantes();

