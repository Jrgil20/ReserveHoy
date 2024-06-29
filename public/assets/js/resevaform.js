document.getElementById('CorreoDelRestaurante').value = urlParams.get('restaurante');

document.getElementById('restauranteForm').addEventListener('submit', function(event){
  handleFormSubmit(event, '/registerRestaurant');
});



function handleFormSubmit(event, url) {
  // Prevent the form from being submitted normally
  event.preventDefault();

  // Get the values of the input fields
  let emailDelCliente = event.target.elements.email.value;
  let FechayhoradelaReserva = event.target.elements.FechayhoradelaReserva.value;
  let [fechadelaReserva, horaDelaReserva] = FechayhoradelaReserva.split('T');
  let personas = event.target.elements.personas.value;
  let correoRes = event.target.elements.CorreoDelRestaurante.value;

  // Do something with the values, like send them to a server
  fetch('/agregarReserva', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: emailDelCliente,
      fecha: fechadelaReserva,
      hora: horaDelaReserva,
      personas: personas,
      restaurante: correoRes
    }),
  })
  .then(response => response.json())
  .then(data => {
    alert(data.message);
    if (data.idReserva) {
      window.location.href = '/view/reserva.html?reserva=' + data.idReserva;
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}
