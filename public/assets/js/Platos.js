const url = new URLSearchParams(window.location.search);
correoResPlat = url.get('restaurante');


fetch(`/consultarPlatos/${correoResPlat}`)
.then(response => response.json())
.then(data => {
    const platosDiv = document.getElementById('platos');
    const platosPorTipo = {};

    // Organize platos by tipo
    data.forEach(plato => {
        if (!platosPorTipo[plato.tipo]) {
            platosPorTipo[plato.tipo] = [];
        }
        platosPorTipo[plato.tipo].push(plato);
    });

    // Print platos by tipo
    for (const tipo in platosPorTipo) {
        const platos = platosPorTipo[tipo];
        const tipoDiv = document.createElement('div');
        tipoDiv.innerHTML = `<h2>${tipo}</h2>`;
        platos.forEach(plato => {
            const platoDiv = document.createElement('div');
            platoDiv.innerHTML = `<p>${plato.nombrePlato}</p>`;
            tipoDiv.appendChild(platoDiv);
        });
        platosDiv.appendChild(tipoDiv);
    }
})
.catch(error => {
    console.error('Error:', error);
});