document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de la manera predeterminada

    const username = document.getElementById('emailLoginRestaurant').value;
    const password = document.getElementById('passwordUser').value;

    fetch('/login', {
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
});