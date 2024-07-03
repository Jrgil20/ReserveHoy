const correoResPlat = sessionStorage.getItem('correoRestaurante');


fetch(`/consultarPlatos/${correoResPlat}`)
    .then(response => response.json())
    .then(data => {
        // Aquí puedes trabajar con la lista de platos obtenida en 'data'
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });