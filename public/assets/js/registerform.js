document.getElementById('restauranteRegisterForm').addEventListener('submit', function(event) {
    handleFormSubmit(event, '/registerRestaurant');
});

document.getElementById('clienteRegisterForm').addEventListener('submit', function(event) {
    handleFormSubmit(event, '/registerClient');
});

function handleFormSubmit(event, url) {
    event.preventDefault(); // Evita que el formulario se envíe de la manera predeterminada

    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;
    const confirmPassword = event.target.elements['confirm-password'].value;

    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
    }

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }),
    })
    .then(response => response.text())
    .then(data => alert(data))
    .catch((error) => {
        console.error('Error:', error);
    });


    fetch('/registerrestau', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, password: password }),
    })
    .then(response => response.text())
    .then(data => alert(data))
    .catch((error) => {
        console.error('Error:', error);
    });
};

