window.onload = function() {
    document.querySelector('restaurante-btn').addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector('restauranteForm').style.display = 'flex';
        document.querySelector('clienteRegisterForm').style.display = 'none';
        document.querySelector('a.restauranteRegister').style.color = 'white';
        document.querySelector('a.clienteRegister').style.color = 'black';
        document.querySelector('a.clienteRegister').style.background= 'none';
        document.querySelector('a.restauranteRegister').style.background = 'linear-gradient(90deg, #004225, #057c48)';
    });

    document.querySelector('cliente-btn').addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector('restauranteForm').style.display = 'none';
        document.querySelector('clienteRegisterForm').style.display = 'flex';
        document.querySelector('a.restauranteRegister').style.color = 'black';
        document.querySelector('a.clienteRegister').style.color = 'white';
        document.querySelector('a.restauranteRegister').style.background = 'none';
        document.querySelector('a.clienteRegister').style.background = 'linear-gradient(90deg, #004225, #057c48)';

    });
}
