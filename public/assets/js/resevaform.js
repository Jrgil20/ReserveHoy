document.getElementById('restauranteForm').addEventListener('submit', function(event) {
    // Prevent the form from being submitted normally
    event.preventDefault();
  
    // Get the values of the input fields
    var nombre = document.getElementById('nombre').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var fecha = document.getElementById('fecha').value;
    var personas = document.getElementById('personas').value;
  
    // Do something with the values, like send them to a server
    fetch('/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombre: nombre,
        email: email,
        phone: phone,
        fecha: fecha,
        personas: personas
      }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  });