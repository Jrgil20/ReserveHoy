console.log('El archivo loginform.js ha sido llamado.');

document.getElementById('restaurantLoginForm').addEventListener('submit', function(event) {
    handleFormSubmit(event, '/loginRestaurant');
});

document.getElementById('clienteLoginForm').addEventListener('submit', function(event) {
    handleFormSubmit(event, '/loginCliente');
});

function handleFormSubmit(event, url) {
    event.preventDefault(); // Evita que el formulario se envíe de la manera predeterminada

    let email = event.target.elements.email.value;
    let password = event.target.elements.password.value;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert(data.message);
        }
        if (data.url) {
            window.location.href = data.url;
        }
    })
    .catch((error) => {
        console.error('Error:', error); 
    });
};


    