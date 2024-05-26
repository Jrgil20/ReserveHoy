console.log('El archivo registerform.js ha sido llamado.');

document.getElementById('restauranteForm').addEventListener('submit', function(event) {
    handleFormSubmit(event, '/registerRestaurant');
});

function handleFormSubmit(event, url) {
    event.preventDefault(); // Evita que el formulario se envíe de la manera predeterminada

    let name = event.target.elements.name.value;
    let email = event.target.elements.email.value;
    let phone = event.target.elements.phone.value;
    let password = event.target.elements.password.value;
    let confirmPassword = event.target.elements['confirm-password'].value;

    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
    }else{
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: name, email: email, phone: phone, password: password }),
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => { throw new Error(err.message); });
            }
            return response.json();
        })
        .then(data => {
            alert(data.message);
            if (data.url) {
                window.location.href = data.url;
            }
        })
        .catch(error => {
            alert(error.message);
        });
    }
};

