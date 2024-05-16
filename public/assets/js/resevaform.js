
document.getElementById('restauranteForm').addEventListener('submit', function(event) {
    // Prevent the form from being submitted normally
    event.preventDefault();
  
    // Get the values of the input fields
    const urlParams = new URLSearchParams(window.location.search);
    let correoRes = urlParams.get('restaurante');
    let email = document.getElementById('email').value;
    let fecha = document.getElementById('fecha').value;
    let personas = document.getElementById('personas').value;
    
  
    // Do something with the values, like send them to a server
    fetch('/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        fecha: fecha,
        personas: personas,
        restaurante: correoRes
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