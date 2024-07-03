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
            let tipoPlato = document.createElement('li');
            tipoPlato.textContent = tipo;
    
            let listaPlatos = document.createElement('ul'); // Cambio de nombre para evitar confusión
            platosPorTipo[tipo].forEach(plato => {
                let platoItem = document.createElement('li');
                platoItem.textContent = plato.nombrePlato;
                listaPlatos.appendChild(platoItem); // Agregar platoItem a listaPlatos, no a platos
            });
    
            tipoPlato.appendChild(listaPlatos); // Agregar listaPlatos a tipoPlato
    
            contenedorPlatos.appendChild(tipoPlato); // Agregar tipoPlato a contenedorPlatos, no a sí mismo
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });