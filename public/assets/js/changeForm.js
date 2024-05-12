window.onload = function() {
    document.querySelector('.restauranteRegister').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('restauranteRegisterForm').style.display = 'flex';
        document.getElementById('clienteRegisterForm').style.display = 'none';
        document.querySelector('a.restauranteRegister').style.color = 'white';
        document.querySelector('a.clienteRegister').style.color = 'black';
        document.querySelector('a.clienteRegister').style.background= 'none';
        document.querySelector('a.restauranteRegister').style.background = 'linear-gradient(90deg, #004225, #057c48)';
    });

    document.querySelector('.clienteRegister').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('restauranteRegisterForm').style.display = 'none';
        document.getElementById('clienteRegisterForm').style.display = 'flex';
        document.querySelector('a.restauranteRegister').style.color = 'black';
        document.querySelector('a.clienteRegister').style.color = 'white';
        document.querySelector('a.restauranteRegister').style.background = 'none';
        document.querySelector('a.clienteRegister').style.background = 'linear-gradient(90deg, #004225, #057c48)';

    });

    document.querySelector('.restauranteLogin').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('restauranteLoginForm').style.display = 'flex';
        document.getElementById('clienteLoginForm').style.display = 'none';
        document.querySelector('a.restauranteLogin').style.color = 'white';
        document.querySelector('a.clienteLogin').style.color = 'black';
        document.querySelector('a.restauranteLogin').style.background= 'none';
        document.querySelector('a.clienteLogin').style.background = 'linear-gradient(90deg, #004225, #057c48)';
    });

    document.querySelector('.clienteLogin').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('restauranteLoginForm').style.display = 'flex';
        document.getElementById('clienteLoginForm').style.display = 'none';
        document.querySelector('a.restauranteLogin').style.color = 'black';
        document.querySelector('a.clienteLogin').style.color = 'white';
        document.querySelector('a.restauranteLogin').style.background = 'none';
        document.querySelector('a.clienteLogin').style.background = 'linear-gradient(90deg, #004225, #057c48)';

    });
}
