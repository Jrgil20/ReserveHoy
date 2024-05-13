window.onload = function() {
    var path = window.location.pathname;
    var page = path.split("/").pop();

    if (page === 'register.html') {
        /* Register Animation */
        const btnRestauranteReg = document.querySelector('a.restauranteRegister-btn');
        const btnClienteReg = document.querySelector('a.clienteRegister-btn');
        const formRestauranteReg = document.querySelector('#restauranteForm');
        const formClienteReg = document.querySelector('#clienteForm');

        // Función para activar el formulario de restaurante
        btnRestauranteReg.addEventListener('click', function(e) {
            e.preventDefault();
            formRestauranteReg.style.display = 'flex';
            formClienteReg.style.display = 'none';
            btnRestauranteReg.style.color = 'white';
            btnRestauranteReg.style.background = 'linear-gradient(90deg, #004225, #057c48)';
            btnClienteReg.style.color = 'black';
            btnClienteReg.style.background = 'none';
        });

        // Función para activar el formulario de cliente
        btnClienteReg.addEventListener('click', function(e) {
            e.preventDefault();
            formClienteReg.style.display = 'flex';
            formRestauranteReg.style.display = 'none';
            btnClienteReg.style.color = 'white';
            btnClienteReg.style.background = 'linear-gradient(90deg, #004225, #057c48)';
            btnRestauranteReg.style.color = 'black';
            btnRestauranteReg.style.background = 'none';
        });
    }
    
    else if (page === 'login.html') {
        /* Login Animation */ 
        const btnRestaurante = document.querySelector('a.restauranteLogin-btn');
        const btnCliente = document.querySelector('a.clienteLogin-btn');
        const formRestaurante = document.querySelector('#restaurantLoginForm');
        const formCliente = document.querySelector('#clienteLoginForm');

        // Función para activar el formulario de restaurante
        btnRestaurante.addEventListener('click', function(e) {
            e.preventDefault();
            formRestaurante.style.display = 'flex';
            formCliente.style.display = 'none';
            btnRestaurante.style.color = 'white';
            btnRestaurante.style.background = 'linear-gradient(90deg, #004225, #057c48)';
            btnCliente.style.color = 'black';
            btnCliente.style.background = 'none';
        });

        // Función para activar el formulario de cliente
        btnCliente.addEventListener('click', function(e) {
            e.preventDefault();
            formCliente.style.display = 'flex';
            formRestaurante.style.display = 'none';
            btnCliente.style.color = 'white';
            btnCliente.style.background = 'linear-gradient(90deg, #004225, #057c48)';
            btnRestaurante.style.color = 'black';
            btnRestaurante.style.background = 'none';
        });
    }
}
